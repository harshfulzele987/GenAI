// AuthContext.js

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (result) => {
    // Replace with your actual API call or authentication logic
    console.log('-----------login function called')
    setIsLoggedIn(result);
  };

  const logout = () => {
    // Replace with your actual logout logic (e.g., clear tokens, session)
    setIsLoggedIn(false);
    // Clear the token from local storage
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
