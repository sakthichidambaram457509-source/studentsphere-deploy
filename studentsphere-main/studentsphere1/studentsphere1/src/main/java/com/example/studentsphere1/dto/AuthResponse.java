package com.example.studentsphere1.dto;

import com.example.studentsphere1.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;

    private Long userId;

    private String name;

    private String email;

    private Role role;
}