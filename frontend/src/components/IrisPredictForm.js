import React, { useState } from 'react';
import axios from 'axios';

const IrisPredictForm = () => {
  const [formData, setFormData] = useState({
    dense_2_input: [0, 0, 0, 0],
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedValues = [...formData.dense_2_input]; // direk formData'dan al
    updatedValues[index] = parseFloat(value);
    setFormData({ ...formData, dense_2_input: updatedValues });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:8000/predict/iris_model', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.data && result.data.predicted_class && result.data.probabilities) {
        const predictions = result.data.probabilities;
        const predictedClass = result.data.predicted_class;
        setResponse({ predictedClass, probabilities: predictions });
      } else {
        setError("Prediction data is not available.");
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };

  const inputLabels = ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"];

  return (
    <>
      <div className='flex justify-center '>
        <div className='flex justify-center flex-col'>
          <form onSubmit={handleSubmit}>
                {formData.dense_2_input.map((value, index) => (
                    <div className='flex justify-between' key={index}>
                        <label className="my-auto text-l font-medium text-black">{inputLabels[index]}:</label>
                        <input type="number" id={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " placeholder={value} required />
                    </div>
                ))}
                <div className='flex justify-center my-4'>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
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
    </> 
  );
};

export default IrisPredictForm;
