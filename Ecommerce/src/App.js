import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
// import Home from './Components/Home';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import Products from './Components/Products';
import Header from './Components/Header';
import ForgotPassword from './Components/ForgotPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="container py-3">
          <Routes>
            <Route path="/" element={<Header/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />

            <Route path="/forgot-password" element={<ForgotPassword />} /> 
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
