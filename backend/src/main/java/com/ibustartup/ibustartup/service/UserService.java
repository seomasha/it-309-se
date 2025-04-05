package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.dto.UserDTO;
import com.ibustartup.ibustartup.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    List<User> findAllUsers();
    Optional<User> findUserById(long id);
    User saveUser(User user);
    void deleteUser(Long id);
    Optional<User> findUserByEmail(String email);
    void resetPassword(String email, String password);
    boolean verifyPassword(String email, String enteredPassword);
    void deactivateAccount(String email);
    User updateUser(long id, UserDTO userDTO);
}
