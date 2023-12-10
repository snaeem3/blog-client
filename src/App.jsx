import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import { fetchPosts } from './apiClient';
import { useAuth } from './authContext';

const App = () => {
  const { isLoggedIn, isAdmin } = useAuth();
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
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      {isLoggedIn && isAdmin ? (
        <Link to="posts/new">
          <button type="button">New Blog Post</button>
        </Link>
      ) : (
        <p>You must be be logged in and an admin to create blog posts</p>
      )}
    </>
  );
};

export default App;
