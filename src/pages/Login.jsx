import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { handleLogin } from '../apiClient';

const { baseURL } = config;

const Login = (props) => (
  <>
    <h1>Log In</h1>
    <LogInForm />
  </>
);

const LogInForm = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleLogin(formData);
      console.log('Log in successful', response.data);
      setErrors([]);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error during login:', error.response.data);
      setErrors(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        placeholder="username@email.com"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" onChange={handleChange} />
      <button type="submit">Submit</button>

      {errors && <p className="error">{errors}</p>}
    </form>
  );
};

export default Login;
