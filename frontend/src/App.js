import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import IrisPredictForm from './components/IrisPredictForm';
import ResultPredictForm from './components/Cifar10PredictForm';
import Home from './components/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { UserProvider, useUser } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<PublicRoute component={Register} />} />
          <Route path="/login" element={<PublicRoute component={Login} />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/iris-model" element={<IrisPredictForm />} />
                  <Route path="/result-model" element={<ResultPredictForm />} />
                  {/* Diğer korunan rotalar buraya eklenecek */}
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ component: Component }) => {
  const { user } = useUser();
  return user ? <Navigate to="/" /> : <Component />;
};

export default App;
