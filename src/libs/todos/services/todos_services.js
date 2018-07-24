const submitTodo = TodosModel => (todo, closed, user) => {
  const newTodo = new TodosModel({ todo, closed, user });
  const savedTodo = newTodo.save();
  return savedTodo;
};

const getTodos = TodosModel => user => {
  const foundTodos = TodosModel.find({ user });
  return foundTodos;
};

module.exports = TodosModel => ({
  submitTodo: submitTodo(TodosModel),
  getTodos: getTodos(TodosModel)
});
