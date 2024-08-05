package com.tfserving.backend.requests;

import lombok.Data;

@Data
public class PredictionCreateRequest {

    Long id;
    Long modelId;
    Long userId;
    String result;
    
}
