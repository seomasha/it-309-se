package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.model.Startup;
import com.ibustartup.ibustartup.dto.StartupDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface StartupService {
    Startup createStartup(StartupDTO startupDTO);
    Optional<Startup> getStartupById(Long id);
    List<Startup> getAllStartups();
    Startup updateStartup(Long id, StartupDTO startupDTO);
    void deleteStartup(Long id);
    List<Startup> searchStartups(String name, String industry, String location);
    Startup verifyStartup(Long id);
    void inviteMember(Long startupId, Long userId);
    List<Startup> getStartupsByIndustry(String industry);
    List<Startup> getStartupsByName(String name);
    List<Startup> getStartupsByLocation(String location);
}
