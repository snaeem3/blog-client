import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPost } from '../apiClient';

const Post = (props) => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({
    title: '',
    content: [],
    author: '',
    date: new Date(),
  });

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postData = await fetchPost(id);
        // console.log(postData.post.date);
        setPostDetail({
          ...postDetail,
          title: postData.post.title,
          content: postData.post.content,
          author: postData.post.author,
          date: new Date(postData.post.date),
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
      <h2>{`By ${postDetail.author} on ${postDetail.date.toLocaleDateString(
        'en-us',
        { year: 'numeric', month: 'short', day: 'numeric' },
      )}`}</h2>
      {postDetail.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
};

export default Post;
