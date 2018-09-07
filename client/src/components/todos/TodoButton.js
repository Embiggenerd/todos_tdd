import React from 'react';
import { DELETE_TODO, TOGGLE_CLOSED } from '../App/constants';

const TodoButton = props => {
  const { todo, role, handleToggleClosed, handleDeleteTodo } = props;
  const renderButton = () => {
    switch (role) {
      case 'toggleClosed':
        return (
          <button
            id="toggle-closed-button"
            className="todos-btn"
            onClick={() => handleToggleClosed(todo._id, TOGGLE_CLOSED)}
          >
            {todo.closed ? 'Undo' : 'Done'}
          </button>
        );
      case 'delete':
        return (
          <button
            id="delete-button"
            className="todos-btn danger-btn"
            onClick={() => handleDeleteTodo(todo._id, DELETE_TODO)}
          >
            Delete
          </button>
        );
    }
  };
  return renderButton();
};

export default TodoButton;
