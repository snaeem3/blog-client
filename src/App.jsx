import { useState, useEffect } from 'react';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Nav from './components/Nav';
import PostForm from './components/PostForm';
import { fetchPosts } from './apiClient';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    getPostData();
  }, []);

  return (
    <>
      <Nav />
      <h1>Blog</h1>
      {posts.map((post, index) => (
        <Post key={index} title={post.title} contentArray={post.content} />
      ))}
      <Login />
      {/* <Signup /> */}
      <PostForm />
    </>
  );
};

export default App;
