package servicetests;

import com.ibustartup.ibustartup.model.User;
import com.ibustartup.ibustartup.repository.UserRepository;
import com.ibustartup.ibustartup.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void saveUser_ShouldEncodePasswordAndSetDefaults_WhenEmailIsUnique() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("plaintext");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode("plaintext")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User savedUser = userService.saveUser(user);

        assertEquals("hashed", savedUser.getPassword());
        assertEquals("user", savedUser.getRole());
        assertEquals("active", savedUser.getStatus());
        verify(userRepository).save(user);
    }

    @Test
    void saveUser_ShouldThrowConflict_WhenEmailExists() {
        User user = new User();
        user.setEmail("existing@example.com");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> userService.saveUser(user));
        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
        verify(userRepository, never()).save(any());
    }

    @Test
    void deactivateAccount_ShouldUpdateStatus_WhenUserExists() {
        User user = new User();
        user.setEmail("user@example.com");
        user.setStatus("active");

        when(userRepository.findUserByEmail("user@example.com")).thenReturn(Optional.of(user));

        userService.deactivateAccount("user@example.com");

        assertEquals("deactivated", user.getStatus());
        verify(userRepository).save(user);
    }
}
