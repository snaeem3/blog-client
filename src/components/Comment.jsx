import { useState, useEffect } from 'react';
import { fetchDisplayName } from '../apiClient';

const Comment = (props) => {
  const { commentText, date, authorId } = props;
  const dateFormatted = date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchAuthorData = async () => {
      const response = await fetchDisplayName(authorId);

      setAuthor(response);
    };

    fetchAuthorData();
  }, [authorId]);

  return (
    <div className="comment">
      <p className="commentText">{commentText}</p>
      <p>{`By ${author} on ${dateFormatted}`}</p>
    </div>
  );
};

export default Comment;
