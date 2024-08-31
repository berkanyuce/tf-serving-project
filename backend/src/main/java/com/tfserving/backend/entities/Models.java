package com.tfserving.backend.entities;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Entity
@Table(name = "tb_models")
@Data
public class Models {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String model_name;

    public String getModelName() {
        return model_name;
    }
}
