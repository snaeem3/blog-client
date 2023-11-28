import { useState, useEffect } from 'react';
import { handlePost } from '../apiClient';

const PostForm = () => {
  const [postData, setPostData] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh

    try {
      const response = await handlePost(postData);
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
