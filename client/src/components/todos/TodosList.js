import React from 'react';

const TodosList = ({ todos, children }) => {
  if (todos.length == 0) {
    return (
      <div className="todos_wrapper">
        <div
          className="todos_wrapper--empty-list"
          data-test-id="empty-todos-list"
        >
          Submit a todo!
        </div>
      </div>
    );
  }
  return (
    <div className="todos_wrapper">
      <ol data-test-id="todos-list" className="todos_list">
        {children}
      </ol>
    </div>
  );
};

export default TodosList;
