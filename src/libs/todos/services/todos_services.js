const submitTodo = TodosModel => async (todo, closed, user) => {
  const newTodo = new TodosModel({ todo, closed, user });
  const savedTodo = await newTodo.save();
  return savedTodo;
};

const getTodos = TodosModel => async user => {
  const foundTodos = await TodosModel.find({ user });
  return foundTodos;
};

const toggleClosed = TodosModel => async id => {
  const foundTodos = await TodosModel.findById(id)
  foundTodos.closed = !foundTodos.closed
  savedTodo = await foundTodos.save()
  return savedTodo
}

const deleteTodo = TodosModel => async id => {
  const deletedTodo = await TodosModel.findByIdAndDelete(id)
  return deletedTodo
}

module.exports = TodosModel => ({
  deleteTodo: deleteTodo(TodosModel),
  toggleClosed: toggleClosed(TodosModel),
  submitTodo: submitTodo(TodosModel),
  getTodos: getTodos(TodosModel)
});
