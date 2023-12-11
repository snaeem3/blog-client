import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../authContext';
import { fetchPost } from '../apiClient';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

const Post = (props) => {
  const { userId } = useAuth();
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({
    title: '',
    content: [],
    author: '',
    comments: [],
    date: new Date(),
  });

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postData = await fetchPost(id);
        console.log('postData: ', postData);
        setPostDetail({
          ...postDetail,
          title: postData.post.title,
          content: postData.post.content,
          author: postData.authorDisplayName,
          comments: postData.comments,
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
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      )}`}</h2>
      {postDetail.content.map((paragraph, index) => (
        <p key={index} className="post-paragraph">
          {paragraph}
        </p>
      ))}
      <div>
        <ul className="comment-list">
          {postDetail.comments.map((comment, index) => (
            <li key={index}>
              <Comment
                commentText={comment.content}
                date={new Date(comment.date)}
                authorId={comment.author}
              />
            </li>
          ))}
        </ul>
        <CommentForm postId={id} userId={userId} />
      </div>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
};

export default Post;
