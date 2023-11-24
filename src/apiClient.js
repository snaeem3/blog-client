import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.baseURL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

const handleSignUp = async (formData) => {
  try {
    const response = await api.post(`/auth/sign-up`, formData);

    // Handle the response, e.g., redirect or show a success message
    console.log(response.data);
    handleLogin(formData);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error('Error during registration:', error.response.data);
    // return error.response.data.errors;
    throw error;
  }
};

const handleLogin = async (formData) => {
  try {
    const response = await api.post('/auth/log-in', formData);

    console.log('Log in successful', response.data);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error('Error during login:', error.response.data);
    throw error;
  }
};

const handleLogout = async () => {
  try {
    const response = await api.get('/auth/log-out');

    console.log('Log out successful', response.data);
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error during logout: ', error.response.data);
    throw error;
  }
};

export { handleSignUp, handleLogin, handleLogout };