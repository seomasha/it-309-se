package com.ibustartup.ibustartup.rest;

import com.ibustartup.ibustartup.dto.StartupDTO;
import com.ibustartup.ibustartup.mapper.StartupMapper;
import com.ibustartup.ibustartup.model.Startup;
import com.ibustartup.ibustartup.model.User;
import com.ibustartup.ibustartup.service.StartupService;
import com.ibustartup.ibustartup.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/startups")
public class StartupController {

    private final StartupService startupService;
    private final UserService userService;

    @Autowired
    public StartupController(StartupService startupService, UserService userService) {
        this.startupService = startupService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Startup> createStartup(@RequestBody @Valid StartupDTO startupDTO) {
        Startup created = startupService.createStartup(startupDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Startup> getStartupById(@PathVariable Long id) {
        return startupService.getStartupById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<List<Startup>> getStartupByOwnerId(@PathVariable Long id) {
        Optional<User> user = userService.findUserById(id);

        if(user.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());

        return ResponseEntity.ok(startupService.getStartupsByOwnerId(id));
    }

    @GetMapping
    public List<Startup> getAllStartups() {
        return startupService.getAllStartups();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Startup> updateStartup(@PathVariable Long id, @RequestBody StartupDTO startupDTO) {
        Startup updated = startupService.updateStartup(id, startupDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStartup(@PathVariable Long id) {
        startupService.deleteStartup(id);
        return ResponseEntity.ok("Startup deleted successfully.");
    }

    @GetMapping("/search")
    public List<StartupDTO> searchStartups(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) String location) {
        List<Startup> startups = startupService.searchStartups(name, industry, location);
        return startups.stream().map(StartupMapper::toDTO).collect(Collectors.toList());
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<StartupDTO> verifyStartup(@PathVariable Long id) {
        Startup verified = startupService.verifyStartup(id);
        return ResponseEntity.ok(StartupMapper.toDTO(verified));
    }

    @PostMapping("/{startupId}/invite")
    public ResponseEntity<?> inviteMember(
            @PathVariable Long startupId,
            @RequestParam Long userId) {
        startupService.inviteMember(startupId, userId);
        return ResponseEntity.ok().build();
    }
}
