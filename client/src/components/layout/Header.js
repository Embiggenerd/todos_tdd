import React from 'react';

const header = ({ username, auth }) => {
  return (
    <header className="header">
      <h1 data-test-id="header">
        Welcome to test driven todos
        {username && auth ? `, ${username}!` : '!'}
      </h1>
    </header>
  );
};
export default header;
