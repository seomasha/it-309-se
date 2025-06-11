package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.model.Photo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PhotoService {
    void savePhoto(List<MultipartFile> photos, Long entityId, String entityType, String role) throws IOException;
    Long savePhotoAndReturnId(final MultipartFile photo, final Long entityId, final String entityType, final String role) throws IOException;
    void deletePhoto(Long id);
    Photo getPhotoByEntityAndRole(Long entityId, String entityType, String role);
    List<Photo> getPhotosByEntity(Long entityId, String entityType);
}
