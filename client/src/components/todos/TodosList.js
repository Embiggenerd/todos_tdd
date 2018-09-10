import React from 'react';

const todosList = props => {
  const { todos } = props;
  if (todos.length == 0) {
    return <div data-test-id="empty-todos-list">Submit a todo!</div>;
  }
  return (
    <div className="todos_wrapper">
      <ol data-test-id="todos-ist" className="todos_list">
        {props.children}
      </ol>
    </div>
  );
};

export default todosList;
