import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import './App.css';
import Signup from './pages/Signup';

const { baseURL } = config;

const App = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // Make a GET request to the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseURL}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
    console.log(posts);
  }, []);

  return (
    <>
      <h1>Blog</h1>
      <Signup />
    </>
  );
};

export default App;
