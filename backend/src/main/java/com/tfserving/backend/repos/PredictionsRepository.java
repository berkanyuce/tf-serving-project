package com.tfserving.backend.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfserving.backend.entities.Predictions;

public interface PredictionsRepository extends JpaRepository<Predictions, Long> {

    List<Predictions> findByUserId(Long userId);
}
