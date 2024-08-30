package com.tfserving.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.tfserving.backend.entities.Predictions;
import com.tfserving.backend.services.PredictionsService;
import com.tfserving.backend.requests.PredictionCreateRequest;


@RestController
@RequestMapping("/predictions")
public class PredictionsController {

    private PredictionsService predictionsService;

    public PredictionsController(PredictionsService predictionsService) {
        this.predictionsService = predictionsService;
    }

    @GetMapping
    public List<Predictions> getPredictions(@RequestParam Optional<Long> user_id) {
        return predictionsService.getAllPredictions(user_id);
    }

    @GetMapping("/{id}")
    public Predictions getPrediction(@PathVariable Long id) {
        return predictionsService.getOnePredictionById(id);
    }

    @PostMapping
    public Predictions createPrediction(@RequestBody PredictionCreateRequest predictionRequest) {
        return predictionsService.createPrediction(predictionRequest);
    }

    @DeleteMapping("/{id}")
    public void deletePrediction(@PathVariable Long id) {
        predictionsService.deletePrediction(id);
    }

    
}
