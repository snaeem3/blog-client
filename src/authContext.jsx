import React, { createContext, useContext, useState, useEffect } from 'react';
import { handleLogin, handleLogout } from './apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState('');

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
      console.log('user', response.user._id);
      setIsLoggedIn(true);
      setDisplayName(response.user.displayName);
      if (response.user.admin) {
        setIsAdmin(true);
      }
      setUserId(response.user._id);
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
    setDisplayName('');
    setIsAdmin(false);
    setUserId('');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, displayName, isAdmin, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
