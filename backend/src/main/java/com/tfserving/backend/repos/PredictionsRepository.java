package com.tfserving.backend.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tfserving.backend.entities.Predictions;

public interface PredictionsRepository extends JpaRepository<Predictions, Long> {

    List<Predictions> findByUserId(Long userId);

    @Query("SELECT p FROM Predictions p LEFT JOIN FETCH p.model WHERE p.user.id = :userId")
    List<Predictions> findByUserIdWithModel(@Param("userId") Long userId);
}
