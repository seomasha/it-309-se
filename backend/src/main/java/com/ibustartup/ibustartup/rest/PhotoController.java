package com.ibustartup.ibustartup.rest;

import com.ibustartup.ibustartup.model.Photo;
import com.ibustartup.ibustartup.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/photos")
public class PhotoController {
    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> uploadPhoto(
            @RequestPart("files") List<MultipartFile> photos,
            @RequestParam("entityId") Long entityId,
            @RequestParam("entityType") String entityType,
            @RequestParam("role") String role
    ) throws IOException {
        if(!photos.isEmpty()) {
            if ("venue".equalsIgnoreCase(entityType) || "user".equalsIgnoreCase(entityType)) {
                final Long photoId = photoService.savePhotoAndReturnId(photos.get(0), entityId, entityType, role);
                return ResponseEntity.status(HttpStatus.CREATED).body(photoId);
            }

            photoService.savePhoto(photos, entityId, entityType, role);
            return ResponseEntity.status(HttpStatus.CREATED).body("Photo successfully uploaded.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("No images were uploaded");
    }

    @GetMapping("/entity/{entityId}")
    public ResponseEntity<?> getPhotosByEntity(
            @PathVariable Long entityId,
            @RequestParam("entityType") String entityType,
            @RequestParam(value = "role", required = false) String role
    ) {
            if (role != null && !role.isEmpty()) {
                Photo photo = photoService.getPhotoByEntityAndRole(entityId, entityType, role);
                if (photo != null) {
                    return ResponseEntity.ok(photo);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } else {
                List<Photo> photos = photoService.getPhotosByEntity(entityId, entityType);
                return ResponseEntity.ok(photos);
            }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePhoto(@PathVariable Long id) {
        photoService.deletePhoto(id);
        return ResponseEntity.ok("Deleted photo with ID: " + id + ".");
    }
}
