import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Register = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // `login` fonksiyonunu kullanıyoruz

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, userpassword }),
    };

    try {
      const response = await fetch("http://localhost:8081/users/register", requestOptions);

      let data;
      try {
        data = await response.json(); // JSON yanıtını ayrıştırma
      } catch (jsonError) {
        console.error("Yanıt ayrıştırılamadı:", jsonError);
        setErrorMessage("Yanıt ayrıştırılamadı. Lütfen tekrar deneyin.");
        return;
      }

      if (response.ok && data.user) {
        login(data.user); // Kullanıcıyı giriş yapmış gibi kaydetme
        localStorage.setItem('user', JSON.stringify(data.user)); // Kullanıcıyı localStorage'da saklama
        navigate('/');
      } else {
        setErrorMessage(data.message || "Kayıt başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Ağ hatası:", error);
      setErrorMessage("Ağ hatası. Lütfen daha sonra tekrar deneyin.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userpassword === confirmationPassword) {
      submitRegistration();
    } else {
      setErrorMessage("Şifreler uyuşmuyor.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-white shadow-md rounded-lg p-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="text-center mt-4">
          <a className="mt-4 underline hover:text-blue-700 hover:cursor-pointer" href="/login">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
