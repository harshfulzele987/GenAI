// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';
import Header from './Header';

const SignUp = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNo: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to your backend
      const response = await axios.post('http://localhost:8081/api/client/auth/register', formData);

      // Handle the response as needed
      console.log('Registration successful:', response.data);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      // Handle errors
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="container">
      <Header></Header>
      <h1>Sign Up Page</h1>
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
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
