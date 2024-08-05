package com.tfserving.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfserving.backend.entities.Models;

public interface ModelsRepository extends JpaRepository<Models, Long> {

}
