import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <>
        <h1 className="text-3xl font-bold underline text-center py-5">Welcome to the Model Prediction App</h1>
        <div className='justify-center flex py-5'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => navigate('/')}>Home</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => navigate('/iris-model')}>Iris Model</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => navigate('/result-model')}>Cifar10 Model</button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                localStorage.setItem('isLoggedIn', 'false'); // Kullanıcının login durumunu localStorage'de güncelle
                setIsLoggedIn(false); // State'i güncelle
                window.location.href = '/login'; // Giriş sayfasına yönlendir
              }}
            >
              Logout
            </button>
        </div>
    </>
  );
};

export default Header;
