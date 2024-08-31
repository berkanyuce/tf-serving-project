import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // Doğru fonksiyon

  const submitLogin = async () => {
    console.log("submitLogin function called");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, userpassword }),
    };

    try {
      const response = await fetch("http://localhost:8081/users/login", requestOptions);
      console.log("Fetch response received");
      const contentType = response.headers.get('Content-Type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json(); // Parse JSON response
        } catch (jsonError) {
          console.error("Failed to parse JSON response:", jsonError);
          setErrorMessage("Failed to parse response. Please try again.");
          return;
        }
      } else {
        setErrorMessage("Unexpected response format");
        return;
      }

      if (response.ok && data.user) {
        login(data.user); // Set user details in context
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user in localStorage
        console.log("Login successful, navigating to home page");
        navigate('/');
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-white shadow-md rounded-lg p-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="text-center mt-4">
          <a className="mt-4 underline hover:text-blue-700 hover:cursor-pointer" href="/register">Don't you have an account? Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
