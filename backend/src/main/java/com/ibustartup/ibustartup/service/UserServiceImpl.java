package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.dto.UserDTO;
import com.ibustartup.ibustartup.model.User;
import com.ibustartup.ibustartup.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findUserById(final long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveUser(final User user) {
        if (userRepository.existsByEmail(user.getEmail()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use.");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("user");
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(final Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findUserByEmail(final String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public void deactivateAccount(final String email) {
        final User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        user.setStatus("deactivated");
        userRepository.save(user);
    }

    @Override
    public User updateUser(final long id, final UserDTO userDTO) {
        final User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setUsername(userDTO.getUsername());
        existingUser.setPhoneNo(userDTO.getPhoneNo());

        return userRepository.save(existingUser);
    }

    @Override
    public void resetPassword(final String email, final String newPassword) {
        final User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }


    @Override
    public boolean verifyPassword(final String email, final String password) {
        final User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        return passwordEncoder.matches(password, user.getPassword());
    }
}
