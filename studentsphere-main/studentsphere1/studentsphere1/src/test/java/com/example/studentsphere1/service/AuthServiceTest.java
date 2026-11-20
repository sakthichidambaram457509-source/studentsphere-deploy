package com.example.studentsphere1.service;

import com.example.studentsphere1.dto.AuthResponse;
import com.example.studentsphere1.dto.LoginRequest;
import com.example.studentsphere1.dto.RegisterRequest;
import com.example.studentsphere1.model.Role;
import com.example.studentsphere1.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void testRegisterSuccess() {
        RegisterRequest request = new RegisterRequest();
        request.setName("John Doe");
        request.setEmail("john@example.com");
        request.setPassword("password123");
        request.setRole(Role.STUDENT);

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("John Doe", response.getName());
        assertEquals("john@example.com", response.getEmail());
        assertEquals(Role.STUDENT, response.getRole());
        assertTrue(userRepository.existsByEmail("john@example.com"));
    }

    @Test
    void testRegisterDuplicateEmailThrowsException() {
        RegisterRequest request = new RegisterRequest();
        request.setName("John Doe");
        request.setEmail("john@example.com");
        request.setPassword("password123");
        request.setRole(Role.STUDENT);

        authService.register(request);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Email already registered", exception.getMessage());
    }

    @Test
    void testLoginSuccess() {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setName("Jane Doe");
        registerRequest.setEmail("jane@example.com");
        registerRequest.setPassword("securePassword");
        registerRequest.setRole(Role.MENTOR);
        authService.register(registerRequest);

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("jane@example.com");
        loginRequest.setPassword("securePassword");

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("Jane Doe", response.getName());
        assertEquals("jane@example.com", response.getEmail());
        assertEquals(Role.MENTOR, response.getRole());
    }
}
