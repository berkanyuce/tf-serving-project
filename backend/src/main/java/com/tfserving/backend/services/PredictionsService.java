package com.tfserving.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.tfserving.backend.repos.PredictionsRepository;
import com.tfserving.backend.requests.PredictionCreateRequest;
import com.tfserving.backend.entities.Predictions;
import com.tfserving.backend.entities.Users;
import com.tfserving.backend.services.UsersService;
import com.tfserving.backend.services.ModelsService;
import com.tfserving.backend.entities.Models;

@Service
public class PredictionsService {

    @Autowired
    private PredictionsRepository predictionsRepository;
    private UsersService usersService;
    private ModelsService modelsService;

    public PredictionsService(PredictionsRepository predictionsRepository, UsersService usersService, ModelsService modelsService) {
        this.predictionsRepository = predictionsRepository;
        this.usersService = usersService;
        this.modelsService = modelsService;
    }

    public List<Predictions> getAllPredictions(Optional<Long> user_id) {
        if (user_id.isPresent()) {
            return predictionsRepository.findByUserIdWithModel(user_id.get());
        }
        return predictionsRepository.findAll();
    }

    public Predictions getOnePredictionById(Long id) {
        return predictionsRepository.findById(id).orElse(null);
    }

    public Predictions createPrediction(PredictionCreateRequest predictionRequest) {
        Users user = usersService.getUser(predictionRequest.getUserId());
        Models model = modelsService.getModel(predictionRequest.getModelId());
        if(user == null || model == null) {
            throw new RuntimeException("Not found");
        }
        Predictions prediction = new Predictions();
        prediction.setUser(user);
        prediction.setModel(model);
        prediction.setResult(predictionRequest.getResult());
        return predictionsRepository.save(prediction);
    }

    public void deletePrediction(Long id) {
        predictionsRepository.deleteById(id);
    }
}
