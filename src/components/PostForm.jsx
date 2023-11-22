import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const { baseURL } = config;

const PostForm = () => {
  const [postData, setPostData] = useState({ title: '', content: '' });

  const handlePost = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(`${baseURL}/posts/new`, postData);
      console.log('POST successful:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <form onSubmit={handlePost}>
      <input
        type="text"
        placeholder="Title"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={postData.content}
        onChange={(e) => setPostData({ ...postData, content: e.target.value })}
      />
      <button type="submit">Post Data</button>
    </form>
  );
};

export default PostForm;
