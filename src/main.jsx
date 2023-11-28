import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './authContext.jsx';
import App from './App.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Post from './components/Post.jsx';
import PostForm from './components/PostForm.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'sign-up',
    element: <Signup />,
  },
  {
    path: 'log-in',
    element: <Login />,
  },
  {
    path: 'posts/:id',
    element: <Post />,
  },
  {
    path: 'posts/new',
    element: <PostForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
