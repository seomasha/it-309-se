package com.ibustartup.ibustartup.rest;

import com.ibustartup.ibustartup.dto.EmailDTO;
import com.ibustartup.ibustartup.dto.UserDTO;
import com.ibustartup.ibustartup.model.User;
import com.ibustartup.ibustartup.service.UserService;
import com.ibustartup.ibustartup.utils.JwtUtil;
import com.ibustartup.ibustartup.utils.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        final List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) throws ResourceNotFoundException {
        return userService.findUserById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        final User savedUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid User loginRequest) {
        final String email = loginRequest.getEmail();
        final String password = loginRequest.getPassword();

        if (userService.verifyPassword(email, password)) {
            final User user = userService.findUserByEmail(email)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
            final String token = jwtUtil.generateToken(user);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(final HttpServletRequest request) {
        return ResponseEntity.ok("Logged out successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User with the id " + id + " has been deleted.");
    }

    @PostMapping("/email")
    public ResponseEntity<User> getUserByEmail(@RequestBody EmailDTO emailDTO) throws ResourceNotFoundException {
        final String email = emailDTO.getEmail();
        final User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable long id,
            @RequestBody @Valid UserDTO userDTO) {
        final User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }
}
