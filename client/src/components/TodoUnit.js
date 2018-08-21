import React from "react";
import TodoButton from "./TodoButton";

const TodoUnit = props => {
  const { todo, closed } = props;

  return (
    <li>
      <div className="todo-unit">
        <p className="todo-text">{todo}</p>
        <TodoButton role="toggleClosed" closed={closed} />
        <TodoButton role="delete"  />
      </div>
    </li>
  );
};

export default TodoUnit;
