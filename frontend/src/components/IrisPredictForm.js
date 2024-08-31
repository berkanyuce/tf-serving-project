import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const IrisPredictForm = () => {
  const [formData, setFormData] = useState([0, 0, 0, 0]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedValues = [...formData];
    updatedValues[index] = parseFloat(value);
    setFormData(updatedValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post('http://localhost:8000/predict/iris_model', {
        dense_2_input: formData
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000
      });

      if (result.data && result.data.predicted_class) {
        const predictedClass = result.data.predicted_class;
        setResponse({ predictedClass });

        try {
          await axios.post('http://localhost:8081/predictions', {
            modelId: 2,
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

  const inputLabels = ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"];

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-1/2'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          {formData.map((value, index) => (
            <div className='flex justify-between mb-4' key={index}>
              <label className="my-auto text-l font-medium text-gray-900">{inputLabels[index]}:</label>
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                required
              />
            </div>
          ))}
          <div className='flex justify-center my-4'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Submit
            </button>
          </div>
        </form>
        {response && (
          <div>
            <p className="font-bold text-center">Predicted Class: {response.predictedClass}</p>
          </div>
        )}
        {error && <div>Error: {JSON.stringify(error)}</div>}
      </div>
    </div>
  );
};

export default IrisPredictForm;
