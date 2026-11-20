package com.example.studentsphere1.dto;

import com.example.studentsphere1.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String name;

    private String email;

    private String password;

    private Role role;
}