import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../authContext';
import {
  fetchPost,
  deletePost,
  handleComment,
  deleteComment,
} from '../apiClient';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

const Post = (props) => {
  const { userId, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({
    title: '',
    content: [],
    author: '',
    comments: [],
    date: new Date(),
  });

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

  const handlePostDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this post${
        postDetail.comments.length > 0 ? ' and its comments' : ''
      }?`,
    );
    if (isConfirmed) {
      try {
        const response = await deletePost(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post ', error);
      }
    }
  };

  const handleCommentSubmit = async (commentText) => {
    try {
      const response = await handleComment(commentText, id, userId);
      console.log('Comment successful', response);
      await getPostDetail();
    } catch (error) {
      console.error('Error submitting comment ', error);
    }
  };

  const handleDeleteCommentClick = async (comment) => {
    console.log(comment);
    const response = await deleteComment(id, comment._id);
    getPostDetail();
  };

  useEffect(() => {
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
      {isAdmin && (
        <button
          type="button"
          className="delete-post-btn"
          onClick={() => handlePostDelete()}
        >
          Delete Post
        </button>
      )}

      <div>
        <ul className="comment-list">
          {postDetail.comments.map((comment, index) => (
            <li key={index}>
              <Comment
                commentText={comment.content}
                date={new Date(comment.date)}
                authorId={comment.author}
              />
              {comment.author === userId && (
                <button
                  type="button"
                  className="delete-comment-btn"
                  onClick={() => handleDeleteCommentClick(comment)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
        {isLoggedIn ? (
          <CommentForm
            postId={id}
            userId={userId}
            handleCommentSubmit={handleCommentSubmit}
          />
        ) : (
          <p>You must be logged in to leave a comment</p>
        )}
      </div>
      <Link to="/">
        <button type="button">Return Home</button>
      </Link>
    </div>
  );
};

export default Post;
