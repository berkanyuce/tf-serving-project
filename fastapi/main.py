from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Burada "*" tüm kökenlere izin verir. Daha güvenli bir seçenek için belirli kökenler belirleyebilirsiniz.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model input sınıfları
class Cifar10ModelInput(BaseModel):
    conv2d_input: list

class IrisModelInput(BaseModel):
    dense_2_input: list

CLASS_LABELS = ["Setosa", "Versicolor", "Virginica"]
CIFAR10_LABELS = [
    "airplane",
    "automobile",
    "bird",
    "cat",
    "deer",
    "dog",
    "frog",
    "horse",
    "ship",
    "truck"
]

# Model endpoint URL'leri
CIFAR10_MODEL_URL = "http://tf_serving:8501/v1/models/cifar10_model:predict"
IRIS_MODEL_URL = "http://tf_serving:8501/v1/models/iris_model:predict"

@app.post("/predict/cifar10_model")
async def predict_cifar10_model(input_data: Cifar10ModelInput):
    try:
        payload = {"instances": [input_data.dict()]}
        response = requests.post(CIFAR10_MODEL_URL, json=payload)
        response.raise_for_status()
        predictions = response.json()
        
        # Tahminlerin CIFAR-10 etiketleriyle eşleştirilmesi
        if 'predictions' in predictions and predictions['predictions']:
            predicted_probabilities = predictions['predictions'][0]
            max_prediction_index = predicted_probabilities.index(max(predicted_probabilities))
            predicted_label = CIFAR10_LABELS[max_prediction_index]
            return {"predicted_class": predicted_label}
        else:
            raise HTTPException(status_code=500, detail="Predictions data is not available")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/predict/iris_model")
async def predict_iris_model(input_data: IrisModelInput):
    try:
        payload = {"instances": [input_data.dict()]}
        response = requests.post(IRIS_MODEL_URL, json=payload)
        response.raise_for_status()
        predictions = response.json()['predictions'][0]
        max_prediction_index = predictions.index(max(predictions))
        predicted_class = CLASS_LABELS[max_prediction_index]
        return {"predicted_class": predicted_class, "probabilities": predictions}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
