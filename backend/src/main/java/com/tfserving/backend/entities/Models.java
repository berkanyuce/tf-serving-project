package com.tfserving.backend.entities;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Table(name = "tb_models")
@Data
public class Models {

    @Id
    Long id;

    String model_name;
}
