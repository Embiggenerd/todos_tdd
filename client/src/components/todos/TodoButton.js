import React from 'react';
import { DELETE_TODO, TOGGLE_CLOSED } from '../App/constants';

const TodoButton = props => {
  const { todo, role, handleToggleClosed, handleDeleteTodo } = props;
  const renderButton = () => {
    switch (role) {
      case 'toggleClosed':
        return (
          <button
            data-test-id="toggle-closed-button"
            className="button"
            onClick={() => handleToggleClosed(todo._id, TOGGLE_CLOSED)}
          >
            {todo.closed ? 'Undo' : 'Done'}
          </button>
        );
      case 'delete':
        return (
          <button
            data-test-id="delete-button"
            className="button button--danger"
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
