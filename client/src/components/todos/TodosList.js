import React from 'react';

const todosList = props => {
  const { todos } = props;
  if (todos.length == 0) {
    return <div>Submit a todo!</div>;
  }
  return (
    <div className="todos-wrapper">
      <ol id="todos-list">{props.children}</ol>
    </div>
  );
};

export default todosList;
