package com.tfserving.backend.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.tfserving.backend.services.ModelsService;
import com.tfserving.backend.entities.Models;
import java.util.List;


@RestController
@RequestMapping("/models")
public class ModelsController {

    private ModelsService modelsService;
    
    public ModelsController(ModelsService modelsService) {
        this.modelsService = modelsService;
    }   

    @GetMapping
    public List<Models> getModels() {
        return modelsService.getModels();
    }

    @PostMapping
    public Models createModel(@RequestBody Models model) {
        return modelsService.createModel(model);
    }

    @GetMapping("/{id}")
    public Models getModel(@PathVariable Long id) {
        return modelsService.getModel(id);
    }

    @PutMapping("/{id}")
    public void updateModel(@PathVariable Long id, @RequestBody Models model) {
        modelsService.updateModel(id, model);
    }

    @DeleteMapping("/{id}")
    public void deleteModel(@PathVariable Long id) {
        modelsService.deleteModel(id);
    }

}
