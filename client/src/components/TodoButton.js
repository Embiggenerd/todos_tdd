import React from "react";

const TodoButton = props => {
  const { closed, role } = props;
  const renderButton = () => {
    switch (role) {
      case "toggleClosed":
        return (
          <button className="todos-btn">{closed ? "Undo" : "Done"}</button>
        );
      case "delete":
        return (
          <button className="todos-btn danger-btn">Delete</button>
        )
    }
    
  };
  return renderButton()
};

export default TodoButton;
