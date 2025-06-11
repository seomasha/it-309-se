package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.model.Photo;
import com.ibustartup.ibustartup.repository.PhotoRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;

    @Value("${supabase.url}")
    private String supabaseURL;
    @Value("${supabase.secret}")
    private String supabaseApiKey;
    private static final String BUCKET_NAME = "ibu-startup-bucket";

    private RestTemplate restTemplate;

    @Autowired
    public PhotoServiceImpl(RestTemplate restTemplate, PhotoRepository photoRepository) {
        this.restTemplate = restTemplate;
        this.photoRepository = photoRepository;
    }

    @SneakyThrows
    @Override
    public void savePhoto(final List<MultipartFile> photos,
                          final Long entityId,
                          final String entityType,
                          final String role) throws IOException {
        for (MultipartFile file : photos) {
            saveSinglePhoto(file, entityId, entityType, role);
        }
    }

    @SneakyThrows
    public Long savePhotoAndReturnId(final MultipartFile photo,
                                     final Long entityId,
                                     final String entityType,
                                     final String role) throws IOException {
        return saveSinglePhoto(photo, entityId, entityType, role).getId();
    }

    public Photo getPhotoByEntityAndRole(Long entityId, String entityType, String role) {
        return photoRepository.findByEntityIdAndEntityTypeAndRole(entityId, entityType, role);
    }

    @SneakyThrows
    private Photo saveSinglePhoto(final MultipartFile file,
                                  final Long entityId,
                                  final String entityType,
                                  final String role) throws IOException {
        final String fileName = file.getOriginalFilename();

        uploadToSupabase(file, fileName);
        final String fileUrl = supabaseURL + "/storage/v1/object/public/" + BUCKET_NAME + "/" + fileName;

        final Photo photo = new Photo();
        photo.setUrl(fileUrl);
        photo.setType(file.getContentType());
        photo.setEntityId(entityId);
        photo.setEntityType(entityType);
        photo.setRole(role);

        return photoRepository.save(photo);
    }

    @Override
    @SneakyThrows
    public void deletePhoto(final Long id) {
        final Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found with id: " + id));

        final String url = photo.getUrl();
        final String fileName = url.substring(url.lastIndexOf("prefix=") + 7, url.lastIndexOf("&version_id"));

        deleteFromSupabase(fileName);

        photoRepository.deleteById(id);
    }

    private void uploadToSupabase(MultipartFile file, String fileName) throws IOException {
        String uploadUrl = supabaseURL + "/storage/v1/object/" + BUCKET_NAME + "/" + fileName;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setBearerAuth(supabaseApiKey);

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);

        ResponseEntity<String> response = restTemplate.exchange(uploadUrl, HttpMethod.POST, requestEntity, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to upload file to Supabase. Status: " + response.getStatusCode());
        }
    }

    private void deleteFromSupabase(String fileName) {
        String deleteUrl = supabaseURL + "/storage/v1/object/" + BUCKET_NAME + "/" + fileName;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(supabaseApiKey);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(deleteUrl, HttpMethod.DELETE, requestEntity, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to delete file from Supabase. Status: " + response.getStatusCode());
        }
    }

    public List<Photo> getPhotosByEntity(Long entityId, String entityType) {
        return photoRepository.findByEntityIdAndEntityType(entityId, entityType);
    }
}
