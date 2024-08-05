package com.tfserving.backend.services;

import com.tfserving.backend.entities.Models;
import com.tfserving.backend.repos.ModelsRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ModelsService {

    private ModelsRepository modelsRepository;

    public ModelsService(ModelsRepository modelsRepository) {
        this.modelsRepository = modelsRepository;
    }

    public List<Models> getModels() {
        return modelsRepository.findAll();
    }

    public Models getModel(Long id) {
        return modelsRepository.findById(id).orElse(null);
    }

    public Models createModel(Models model) {
        return modelsRepository.save(model);
    }

    public void updateModel(Long id, Models model) {
        Models existingModel = modelsRepository.findById(id).orElse(null);
        if (existingModel != null) {
            existingModel.setId(existingModel.getId());
            existingModel.setModel_name(model.getModel_name());
            modelsRepository.save(existingModel);
        }
    }

    public void deleteModel(Long id) {
        modelsRepository.deleteById(id);
    }
}
