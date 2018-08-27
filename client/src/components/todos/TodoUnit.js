import React from 'react';
import { TodoButton } from './index.js';

const TodoUnit = props => {
  const { todo, handleToggleClosed, handleDeleteTodo } = props;
  const getStyle = () => ({
    textDecoration: todo.closed ? 'line-through' : 'none'
  });

  return (
    <li className="todo-li">
      <div className="todo-unit">
        <p style={getStyle()} className="todo-text">
          {todo.todo}
        </p>
        <TodoButton
          role="toggleClosed"
          todo={todo}
          handleToggleClosed={handleToggleClosed}
        />
        <TodoButton
          todo={todo}
          role="delete"
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </li>
  );
};

export default TodoUnit;
