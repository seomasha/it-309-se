package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.dto.StartupDTO;
import com.ibustartup.ibustartup.model.Startup;
import com.ibustartup.ibustartup.model.User;
import com.ibustartup.ibustartup.repository.StartupRepository;
import com.ibustartup.ibustartup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StartupServiceImpl implements StartupService {

    private final StartupRepository startupRepository;
    private final UserRepository userRepository;

    @Autowired
    public StartupServiceImpl(StartupRepository startupRepository, UserRepository userRepository) {
        this.startupRepository = startupRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Startup createStartup(StartupDTO startupDTO) {
        if (startupRepository.findByNameContainingIgnoreCase(startupDTO.getName()).stream()
                .anyMatch(s -> s.getName().equalsIgnoreCase(startupDTO.getName()))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Startup name already exists.");
        }

        User owner = userRepository.findById(startupDTO.getOwnerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner not found"));

        Startup startup = new Startup();
        startup.setName(startupDTO.getName());
        startup.setDescription(startupDTO.getDescription());
        startup.setIndustry(startupDTO.getIndustry());
        startup.setLocation(startupDTO.getLocation());
        startup.setLogoUrl(startupDTO.getLogoUrl());
        startup.setSize(startupDTO.getSize());
        startup.setOwner(owner);

        if (startupDTO.getMemberIds() != null && !startupDTO.getMemberIds().isEmpty()) {
            Set<User> members = startupDTO.getMemberIds().stream()
                    .map(id -> userRepository.findById(id)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + id + " not found")))
                    .collect(Collectors.toSet());
            startup.setMembers(members);
        } else {
            startup.setMembers(new HashSet<>());
        }

        return startupRepository.save(startup);
    }

    @Override
    public Optional<Startup> getStartupById(Long id) {
        return startupRepository.findById(id);
    }

    @Override
    public List<Startup> getAllStartups() {
        return startupRepository.findAll();
    }

    @Override
    public Startup updateStartup(Long id, StartupDTO startupDTO) {
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Startup not found"));

        if (startupDTO.getName() != null) startup.setName(startupDTO.getName());
        if (startupDTO.getDescription() != null) startup.setDescription(startupDTO.getDescription());
        if (startupDTO.getIndustry() != null) startup.setIndustry(startupDTO.getIndustry());
        if (startupDTO.getLocation() != null) startup.setLocation(startupDTO.getLocation());
        if (startupDTO.getLogoUrl() != null) startup.setLogoUrl(startupDTO.getLogoUrl());
        if (startupDTO.getSize() != null) startup.setSize(startupDTO.getSize());

        if (startupDTO.getMemberIds() != null) {
            Set<User> members = startupDTO.getMemberIds().stream()
                    .map(idVal -> userRepository.findById(idVal)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + idVal + " not found")))
                    .collect(Collectors.toSet());
            startup.setMembers(members);
        }

        return startupRepository.save(startup);
    }

    @Override
    public void deleteStartup(Long id) {
        startupRepository.deleteById(id);
    }

    @Override
    public List<Startup> searchStartups(String name, String industry, String location) {
        List<Startup> startups = startupRepository.findAll();
        if (name != null && !name.isEmpty())
            startups = startups.stream().filter(s -> s.getName().toLowerCase().contains(name.toLowerCase())).collect(Collectors.toList());
        if (industry != null && !industry.isEmpty())
            startups = startups.stream().filter(s -> industry.equalsIgnoreCase(s.getIndustry())).collect(Collectors.toList());
        if (location != null && !location.isEmpty())
            startups = startups.stream().filter(s -> s.getLocation().toLowerCase().contains(location.toLowerCase())).collect(Collectors.toList());
        return startups;
    }

    @Override
    public List<Startup> getStartupsByIndustry(String industry) {
        if (industry == null || industry.isEmpty()) return Collections.emptyList();
        return startupRepository.findByIndustry(industry);
    }

    @Override
    public List<Startup> getStartupsByName(String name) {
        if (name == null || name.isEmpty()) return Collections.emptyList();
        return startupRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Startup> getStartupsByLocation(String location) {
        if (location == null || location.isEmpty()) return Collections.emptyList();
        return startupRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Startup> getStartupsByOwnerId(Long id) {
        return startupRepository.findAllByOwner_Id(id);
    }

    @Override
    public Startup verifyStartup(Long id) {
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Startup not found"));
        startup.setVerified(true);
        return startupRepository.save(startup);
    }

    @Override
    public void inviteMember(Long startupId, Long userId) {
        Startup startup = startupRepository.findById(startupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Startup not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        startup.getMembers().add(user);
        startupRepository.save(startup);
    }
}
