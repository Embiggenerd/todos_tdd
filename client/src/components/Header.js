import React from 'react';

const header = props => {
  const { username } = props;
  return (
    <header className="header">
      <h1>
        Welcome to test driven todos
        {username ? `, ${username}!` : '!'}
      </h1>
    </header>
  );
};
export default header;
