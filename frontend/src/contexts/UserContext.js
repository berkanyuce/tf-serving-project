import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const fetchPredictions = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/predictions?user_id=${userId}`);
      const predictions = await response.json();
      setUser((prevUser) => ({ ...prevUser, predictions }));
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    }
  };

  const login = (userData) => {
    setUser({ ...userData, predictions: [] });
    localStorage.setItem('user', JSON.stringify({ ...userData, predictions: [] }));
    fetchPredictions(userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.id) {
        fetchPredictions(parsedUser.id);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
