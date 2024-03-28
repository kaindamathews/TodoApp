package com.example.backendtodoappapi.auth;


import com.example.backendtodoappapi.config.JwtService;
import com.example.backendtodoappapi.generalexception.ErrorType;
import com.example.backendtodoappapi.generalexception.GeneralException;
import com.example.backendtodoappapi.generalexception.GeneralExceptionResponse;
import com.example.backendtodoappapi.token.Token;
import com.example.backendtodoappapi.token.TokenRepository;
import com.example.backendtodoappapi.token.TokenType;
import com.example.backendtodoappapi.user.User;
import com.example.backendtodoappapi.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> register(RegisterRequest request) {
        try {


            if (userRepository.existsByEmail(request.getEmail())) {
                throw new GeneralException(ErrorType.DUPLICATE,
                        "Email or Phone Number already exists in the system", HttpStatus.BAD_REQUEST);
            }


            var user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .build();
            var savedUser = userRepository.save(user);


            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            saveUserToken(savedUser, jwtToken);
            return ResponseEntity.ok(AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build());
        }  catch (DataIntegrityViolationException ex) {
        // Handle duplicate key violation
        throw new GeneralException(ErrorType.DUPLICATE,
                "Email already exists in the system", HttpStatus.BAD_REQUEST);
    } catch (GeneralException ex) {
            GeneralExceptionResponse response = new GeneralExceptionResponse(
                    ex.getErrorType(),
                    ex.getErrorMessage(),
                    ex.getHttpStatus().value());
            return ResponseEntity.status(ex.getHttpStatus()).body(response);
        }
    }


    public ResponseEntity<?> authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new GeneralException(
                            ErrorType.INVALID_CREDENTIALS,
                            "User not found", HttpStatus.NOT_FOUND));
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);

            return ResponseEntity.ok(AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build());
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new GeneralExceptionResponse(
                            ErrorType.INVALID_CREDENTIALS, "Authentication failed", HttpStatus.UNAUTHORIZED.value()));
        } catch (GeneralException ex) {
            return ResponseEntity.status(ex.getHttpStatus()).body(new GeneralExceptionResponse(
                    ex.getErrorType(),
                    ex.getErrorMessage(),
                    ex.getHttpStatus().value()));
        }
    }


    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
