import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import IrisPredictForm from './components/IrisPredictForm';
import ResultPredictForm from './components/Cifar10PredictForm';
import Home from './components/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      {/* Header componentini sadece login ve register sayfalarında göstermeyeceğiz */}
      {isLoggedIn && (
        <Header setIsLoggedIn={setIsLoggedIn} />
      )}
      
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/iris-model" element={<IrisPredictForm setIsLoggedIn={setIsLoggedIn} modelType="iris_model" />} />
        <Route path="/result-model" element={<ResultPredictForm setIsLoggedIn={setIsLoggedIn} modelType="result_model" />} />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
