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
  } catch (error) {
    console.error('Error during logout: ', error.response.data);
    throw error;
  }
};

const handlePost = async (postData, userId) => {
  postData.authorId = userId;
  console.log('postData: ', postData);
  try {
    const response = await api.post('/posts/new', postData);
    console.log('POST successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data: ', error.response.data);
    throw error;
  }
};

const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    console.log('Fetch posts successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error.response.data);
    throw error;
  }
};

const fetchPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    console.log(`Fetch post ${id} successful: `, response.data);
    console.log(`author: `, response.data.post.author);
    try {
      const authorDisplayName = await fetchDisplayName(
        response.data.post.author,
      );
      return { ...response.data, authorDisplayName };
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(`Error fetching post ${id}: `, error.response.data);
    throw error;
  }
};

const fetchDisplayName = async (id) => {
  try {
    const response = await api.get(`/users/${id}/displayName`);
    console.log(`Fetch user ${id} displayName successful: `, response.data);
    return response.data.displayName;
  } catch (error) {
    console.error(`Error fetching user ${id}: `, error.response.data);
    throw error;
  }
};

export {
  handleSignUp,
  handleLogin,
  handleLogout,
  handlePost,
  fetchPosts,
  fetchPost,
};
