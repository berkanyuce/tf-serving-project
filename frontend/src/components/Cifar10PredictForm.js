import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const processImage = async (file) => {
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      img.src = reader.result;
    };

    img.onload = () => {
      canvas.width = 32;
      canvas.height = 32;
      ctx.drawImage(img, 0, 0, 32, 32);

      const imageData = ctx.getImageData(0, 0, 32, 32);
      const data = imageData.data;
      const matrix = [];

      for (let i = 0; i < 32; i++) {
        const row = [];
        for (let j = 0; j < 32; j++) {
          const index = (i * 32 + j) * 4;
          const r = data[index] / 255;
          const g = data[index + 1] / 255;
          const b = data[index + 2] / 255;
          row.push([r, g, b]); 
        }
        matrix.push(row);
      }

      resolve(matrix);
    };

    img.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

const Cifar10PredictForm = () => {
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser(); 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imgData = await processImage(file);
        setImageData(imgData);

        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
      } catch (err) {
        setError("Failed to process image");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageData) {
      setError("No image data available");
      return;
    }

    try {
      const result = await axios.post('http://localhost:8000/predict/cifar10_model', {
        conv2d_input: imageData
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000
      });

      if (result.data && result.data.predicted_class) {
        const predictedClass = result.data.predicted_class;
        setResponse({ predictedClass });
        console.log(user);
        
        
        try {
          await axios.post('http://localhost:8081/predictions', {
            modelId: 1,
            userId: user.id,
            result: predictedClass
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 5000
          });
        } catch (error) {
          console.error("Error saving prediction:", error);
          setError(error.response ? error.response.data : 'An error occurred while saving prediction');
        }
      } else {
        setError("Prediction data is not available.");
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setError(error.response ? error.response.data : 'An error occurred while fetching prediction');
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-1/2'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label className="flex justify-center mb-2 text-l font-medium text-gray-900">
            Upload Image for Prediction
          </label>
          <input 
            type="file" 
            accept="image/*" 
            className="flex justify-center text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
            onChange={handleImageChange} 
          />
          <div className='flex justify-center my-4'>
            <button 
              type="submit" 
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        </form>
        {imagePreview && (
          <div className='flex justify-center flex-col'>
            <h2 className='font-bold text-center py-4'>Image Preview:</h2>
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
        {response && (
          <div>
            <h1 className='font-bold text-center py-4'>Predicted Class: {response.predictedClass}</h1>
          </div>
        )}
        {error && <div>Error: {JSON.stringify(error)}</div>}
      </div>
    </div>
  );
};

export default Cifar10PredictForm;
