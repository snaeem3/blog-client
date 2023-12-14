import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.baseURL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

// Add a request interceptor to set the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

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

const handlePost = async (postData, userId, postId) => {
  postData.authorId = userId;
  console.log('postData: ', postData);

  // Update post if postId is provided otherwise create new post
  if (postId) {
    try {
      const response = await api.put(`/posts/${postId}`, postData);
      console.log('PUT successful ', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating post: ', error.response.data);
      throw error;
    }
  } else {
    try {
      const response = await api.post('/posts/new', postData);
      console.log('POST successful', response.data);
      return response.data;
    } catch (error) {
      console.error('Error posting data: ', error.response.data);
      throw error;
    }
  }
};

const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    console.log('DELETE post successful ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting data: ', error.response.data);
    throw error;
  }
};

const handleComment = async (commentText, postId, userId) => {
  const commentData = { commentText, authorId: userId };
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    console.log('POST successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data: ', error.response.data.errors);
    throw error;
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    console.log('DELETE comment successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment: ', error);
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
      const [authorDisplayName, comments] = await Promise.all([
        fetchDisplayName(response.data.post.author),
        fetchComments(id),
      ]);
      return { ...response.data, authorDisplayName, comments };
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(`Error fetching post ${id}: `, error.response.data);
    throw error;
  }
};

const fetchComment = async (id) => {
  try {
    const response = await api.get(`/comments/${id}`);
    console.log(`Fetch comment ${id} successful: `, response.data);
    console.log(`author: `, response.data.comment.author);
    try {
      const authorDisplayName = await fetchDisplayName(
        response.data.comment.author,
      );
      return { ...response.data, authorDisplayName };
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(`Error fetching comment ${id}: `, error.response.data);
    throw error;
  }
};

const fetchComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    console.log(
      `Fetch comments for Post ${postId} successful: `,
      response.data,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching comments for Post ${postId}: `,
      error.response.data,
    );
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
  deletePost,
  handleComment,
  deleteComment,
  fetchPosts,
  fetchPost,
  fetchDisplayName,
};
