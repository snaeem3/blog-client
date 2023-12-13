import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, handlePost } from '../apiClient';
import { useAuth } from '../authContext';

const PostForm = () => {
  const { userId } = useAuth();
  const { id } = useParams(); // postId
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPostData = async (postId) => {
      const response = await fetchPost(postId);
      console.log(response.post);
      setPostData({
        title: response.post.title,
        content: response.post.content,
      });
    };

    if (id) {
      fetchPostData(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh
    console.log('userId: ', userId);
    try {
      const response = await handlePost(postData, userId, id);
      console.log('POST successful', response);
      navigate(id ? `/posts/${id}` : response.url ? response.url : '/');
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
