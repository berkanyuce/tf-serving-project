import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const submitRegistration = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, userpassword }),
      };

      try {
        const response = await fetch("http://localhost:8080/users/login", requestOptions);
        
        console.log("Response:", response);

        let data;
        try {
          data = await response.text(); // JSON yerine text kullanıyoruz
          console.log("Data:", data);
        } catch (textError) {
          console.error("Failed to parse response:", textError);
        }

        if (!response.ok) {
          setErrorMessage("Login failed. Please try again.");
        } else {
          props.setIsLoggedIn(true);
          navigate('/'); 
        }
      } catch (error) {
        console.error("Network error:", error);
        setErrorMessage("Network error. Please try again later.");
      }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    submitRegistration();
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
        <div className="mb-4">
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
          <a className="mt-4 underline hover:text-blue-700 hover:cursor-pointer" href="http://localhost:3000/register">If you don't have an account sign up</a>
        </div>
      </form>
      
    </div>
  );
};

export default Login;
