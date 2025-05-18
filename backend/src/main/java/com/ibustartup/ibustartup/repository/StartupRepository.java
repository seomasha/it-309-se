package com.ibustartup.ibustartup.repository;

import com.ibustartup.ibustartup.model.Startup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StartupRepository extends JpaRepository<Startup, Long> {
    List<Startup> findByIndustry(String industry);
    List<Startup> findByNameContainingIgnoreCase(String name);
    List<Startup> findByLocationContainingIgnoreCase(String location);
}
