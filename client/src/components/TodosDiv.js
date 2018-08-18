import React from "react";

export default props => {
  const { todos } = props;

  const todosList = () => todos.map(todo => <li>{todo.todo}</li>)
  
  console.log('length', todos.length)
  

  if (todos.length > 0) {
    return <ul>{todosList()}</ul>;
  }
  return <div>Submit a todo!</div>;
};
