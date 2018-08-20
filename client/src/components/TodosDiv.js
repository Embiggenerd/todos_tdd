import React from 'react';

const todosDiv = props => {
  const { todos } = props;

  const todosList = () => todos.map(todo => <li>{todo.todo}</li>);

  console.log('length', todos.length);

  if (todos.length > 0) {
    return (
      <div className="todos-wrapper">
        <ol id="todos-list">{todosList()}</ol>
      </div>
    );
  }
  return <div>Submit a todo!</div>;
};

export default todosDiv;
