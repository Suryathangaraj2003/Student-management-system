import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        setError('You are not authorized to access the admin dashboard');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center bg-amber-600 w-1/3 py-6">
        <h2>Admin Login</h2>
        <div className="flex flex-col w-60 text-start">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="items-start rounded border-2"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border-2"
          />
        </div>
        <button onClick={handleLogin} className="bg-emerald-500 rounded px-4 py-2 m-6">
          Login
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
