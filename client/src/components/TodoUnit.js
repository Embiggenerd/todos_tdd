import React from 'react';
import TodoButton from './TodoButton';

const getStyle = {
  textDecoration: 'line-through'
};

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
          handleDeleteTodo={handleDeleteTodo}
        />
        <TodoButton role="delete" />
      </div>
    </li>
  );
};

export default TodoUnit;
