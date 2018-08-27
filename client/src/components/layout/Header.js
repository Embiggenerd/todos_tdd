import React from 'react';

const header = props => {
  const { username, auth } = props;
  return (
    <header className="header">
      <h1>
        Welcome to test driven todos
        {username && auth ? `, ${username}!` : '!'}
      </h1>
    </header>
  );
};
export default header;
