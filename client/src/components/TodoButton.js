import React from "react";

const TodoButton = props => {
  const { todo, role, handleToggleClosed, handleDeleteTodo } = props;
  const renderButton = () => {
    switch (role) {
      case "toggleClosed":
        return (
          <button
            id="toggle-closed-button"
            className="todos-btn"
            onClick={() => handleToggleClosed(todo._id, "toggleClosed")}
          >
            {todo.closed ? "Undo" : "Done"}
          </button>
        );
      case "delete":
        return (
          <button
            id="delete-button"
            className="todos-btn danger-btn"
            onClick={() => {
              {/* console.log("deleteButtons todo", todo); */}
              handleDeleteTodo(todo._id, "deleteTodo");
            }}
          >
            Delete
          </button>
        );
    }
  };
  return renderButton();
};

export default TodoButton;
