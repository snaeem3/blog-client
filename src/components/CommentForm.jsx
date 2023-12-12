import { useState, useEffect } from 'react';

const CommentForm = (props) => {
  const { handleCommentSubmit } = props;
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh
    try {
      await handleCommentSubmit(commentText);
      setCommentText('');
    } catch (error) {
      console.error(error);
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
