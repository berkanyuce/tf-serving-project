import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import IrisPredictForm from './components/IrisPredictForm';
import ResultPredictForm from './components/Cifar10PredictForm';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iris-model" element={<IrisPredictForm modelType="iris_model" />} />
        <Route path="/result-model" element={<ResultPredictForm modelType="result_model" />} />
      </Routes>
    </Router>
  );
};

export default App;
