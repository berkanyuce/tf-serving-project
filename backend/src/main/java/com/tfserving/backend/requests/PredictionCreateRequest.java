package com.tfserving.backend.requests;

import lombok.Data;

@Data
public class PredictionCreateRequest {

    Long modelId;
    Long userId;
    String result;
    
}
