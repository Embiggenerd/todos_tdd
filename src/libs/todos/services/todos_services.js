const submitTodo = TodosModel => async (todo, closed, user) => {
  const newTodo = new TodosModel({ todo, closed, user });
  const savedTodo = await newTodo.save();
  return savedTodo;
};

const getTodos = TodosModel => async user => {
  const foundTodos = await TodosModel.find({ user });
  return foundTodos;
};

module.exports = TodosModel => ({
  submitTodo: submitTodo(TodosModel),
  getTodos: getTodos(TodosModel)
});
