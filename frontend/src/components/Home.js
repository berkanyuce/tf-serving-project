import React from 'react';
import { useUser } from '../contexts/UserContext';

const Home = () => {
    const { user } = useUser(); 
    console.log(user);

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-1/2">
                <h1 className="text-2xl font-bold text-center py-5">
                    Hello {user.username}! Welcome to Moduler Data Science App! You can choose a model from above.
                </h1>
                
                <div className="overflow-x-auto w-3/4">
                    <h1 className='text-xl font-bold text-center py-5'>Your Prediction History</h1>
                    {user.predictions && user.predictions.length > 0 ? (
                        <table className="min-w-full bg-white shadow-md rounded">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 bg-gray-200">Model Name</th>
                                    <th className="py-2 px-4 bg-gray-200">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.predictions.map((prediction) => (
                                    <tr key={prediction.id}>
                                        <td className="border py-2 px-4">{prediction.modelName}</td>
                                        <td className="border py-2 px-4">{prediction.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No predictions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
