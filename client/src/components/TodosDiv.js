import React from 'react';
import TodoUnit from './TodoUnit';

const todosDiv = props => {
  const { todos, handleToggleClosed, handleDeleteTodo } = props;

  const todosList = () =>
    todos.map(todo => (
      <TodoUnit
        key={todo._id}
        todo={todo}
        handleToggleClosed={handleToggleClosed}
        handleDeleteTodo={handleDeleteTodo}
      />
    ));

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
