package com.ibustartup.ibustartup.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Set;

@Data
public class StartupDTO {
    private Long id;

    @NotBlank(message= "Name is required")
    private String name;

    @NotBlank(message= "Description is required")
    private String description;

    @NotBlank(message= "Industry is required")
    private String industry;

    @NotBlank(message= "Location is required")
    private String location;

    private String logoUrl;
    private String size;
    private boolean verified;
    private Long ownerId;
    private Set<Long> memberIds;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getIndustry() {
        return industry;
    }

    public String getLocation() {
        return location;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public String getSize() {
        return size;
    }

    public boolean isVerified() {
        return verified;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public Set<Long> getMemberIds() {
        return memberIds;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setMemberIds(Set<Long> memberIds) {
        this.memberIds = memberIds;
    }
}
