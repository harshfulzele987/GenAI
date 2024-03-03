import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from './AuthContext';
import Header from './Header';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgotPassword = () => {
    // Redirect to the forgot password page (replace with actual URL)
    navigate('/forgot-password');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to your backend for authentication
      const response = await axios.post('http://localhost:8081/api/client/auth/login', formData);

      // Handle the response as needed
      console.log(response.data.jwt)
      const token  = response.data.jwt;

      // Store the JWT token in local storage
      localStorage.setItem('token', token);

      if(token !=null){
        login(true)
      }else{
        login(false)
      }

      // Redirect to the Products page after successful login
      navigate('/products');
    } catch (error) {
      // Handle authentication failure
      setError('Invalid credentials');
      console.error('Login failed:', error.message);
    }
    
  };

  return (
    <div className="container">
      <Header></Header>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {error && <p className="text-danger">{error}</p>}
        <a href="#" onClick={handleForgotPassword} className="text-muted">
          Forgot Password?
        </a>
      </form>
    </div>
  );
};

export default Login;
