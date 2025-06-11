package com.ibustartup.ibustartup.repository;

import com.ibustartup.ibustartup.model.Photo;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    void deleteById(@NotNull Long id);
    List<Photo> findByEntityIdAndEntityType(Long entityId, String entityType);
    Photo findByEntityIdAndEntityTypeAndRole(Long entityId, String entityType, String role);
}
