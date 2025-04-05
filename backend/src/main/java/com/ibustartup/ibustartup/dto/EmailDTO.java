package com.ibustartup.ibustartup.dto;

import lombok.Data;

@Data
public class EmailDTO {
    private String email;

    public String getEmail() {
        return email;
    }
}
