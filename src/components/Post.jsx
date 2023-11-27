import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../apiClient';

const Post = (props) => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({
    title: '',
    content: [],
    author: '',
  });

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postData = await fetchPost(id);
        setPostDetail({
          ...postDetail,
          title: postData.post.title,
          content: postData.post.content,
          author: postData.post.author,
        });
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    getPostDetail();
  }, []);

  return (
    <div className="post">
      <h1>{postDetail.title}</h1>
    </div>
  );
};

export default Post;
