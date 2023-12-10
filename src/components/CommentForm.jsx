import { useState, useEffect } from 'react';
import { handleComment } from '../apiClient';
import { useAuth } from '../authContext';

const CommentForm = (props) => {
  const { postId, userId } = props;
  // const { userId } = useAuth();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh
    console.log('userId: ', userId);
    try {
      const response = await handleComment(commentText, postId, userId);
      console.log('Comment successful', response);
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment</label>
      <textarea
        name="comment"
        placeholder="Comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
