package com.ibustartup.ibustartup.mapper;

import com.ibustartup.ibustartup.dto.StartupDTO;
import com.ibustartup.ibustartup.model.Startup;
import com.ibustartup.ibustartup.model.User;

import java.util.stream.Collectors;

public class StartupMapper {
    public static StartupDTO toDTO(Startup s) {
        StartupDTO dto = new StartupDTO();
        dto.setId(s.getId());
        dto.setName(s.getName());
        dto.setDescription(s.getDescription());
        dto.setIndustry(s.getIndustry());
        dto.setLocation(s.getLocation());
        dto.setLogoUrl(s.getLogoUrl());
        dto.setSize(s.getSize());
        dto.setVerified(s.isVerified());
        dto.setOwnerId(s.getOwner() != null ? s.getOwner().getId() : null);
        dto.setMemberIds(s.getMembers().stream().map(User::getId).collect(Collectors.toSet()));
        return dto;
    }
}
