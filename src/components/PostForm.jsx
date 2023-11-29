import { useState, useEffect } from 'react';
import { handlePost } from '../apiClient';
import { useAuth } from '../authContext';

const PostForm = () => {
  const { userId } = useAuth();
  const [postData, setPostData] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh
    console.log('userId: ', userId);
    try {
      const response = await handlePost(postData, userId);
      console.log('POST successful', response);
    } catch (error) {
      console.error('Error posting data', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
