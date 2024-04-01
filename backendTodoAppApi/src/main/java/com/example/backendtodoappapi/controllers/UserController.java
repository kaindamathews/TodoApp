package com.example.backendtodoappapi.controllers;

import com.example.backendtodoappapi.user.UserService;
import com.example.backendtodoappapi.user.response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserController {
    private final UserService userService;

    @GetMapping("/getUserProfile")
    @PreAuthorize("hasAnyAuthority('user:read')")
    public UserResponse getUserProfile(Principal connectedUser){
        return userService.getUserProfile(connectedUser);
    }


}
