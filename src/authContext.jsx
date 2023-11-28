import React, { createContext, useContext, useState, useEffect } from 'react';
import { handleLogin, handleLogout } from './apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await handleLogin({
        username,
        password,
      });
      localStorage.setItem('token', response.accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during log-in: ', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await handleLogout();
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error during logout: ', error);
      throw error;
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
