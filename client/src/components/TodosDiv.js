import React from 'react';
import TodoUnit from './TodoUnit'

const todosDiv = props => {
  const { todos } = props;

  const todosList = () => todos.map(todo => <TodoUnit key={todo.todo} closed={todo.closed} todo={todo.todo}/>);

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
