package com.example.backendtodoappapi.user.response;

import com.example.backendtodoappapi.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResponse {
    private long userId;
    private String firstname;
    private String lastname;
    private String email;

    public static UserResponse fromUser(User user){
       return UserResponse.builder()
                .userId(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .build();
     }
}
