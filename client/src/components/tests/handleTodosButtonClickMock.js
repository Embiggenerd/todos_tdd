module.exports = function(id, url) {
  const getIndex = (id, arr) => arr.findIndex(item => item._id === id);
  console.log('lzz');

  
  const toggleClosed = () => {
    const oldTodos = [...this.state.todos];
    oldTodos[getIndex(id, oldTodos)] = Object.assign(
      oldTodos[getIndex(id, oldTodos)],
      { closed: !oldTodos[getIndex(id, oldTodos)].closed }
    );
    const newTodos = [...oldTodos];
    this.setState({
      todos: newTodos
    });
  };
  const deleteTodo = () => {
    console.log('deleteTodo called');
    const todoIndex = getIndex(id, this.state.todos);
    const newTodos = this.state.todos
      .slice(0, todoIndex)
      .concat(this.state.todos.slice(todoIndex + 1));
    this.setState({
      todos: newTodos
    });
  };
  switch (url) {
    case 'toggleClosed':
      toggleClosed();
      break;
    case 'deleteTodo':
      deleteTodo();
      break;
  }

};
