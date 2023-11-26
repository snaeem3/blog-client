import { useState, useEffect } from 'react';

const Post = (props) => {
  const { title, contentArray } = props;

  return (
    <div className="post">
      <h1 className="post-title">{title}</h1>
      {contentArray.map((content, index) => (
        <p key={index} className="content-text">
          {content}
        </p>
      ))}
    </div>
  );
};

export default Post;
