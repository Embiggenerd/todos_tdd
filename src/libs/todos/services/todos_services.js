const submitTodo = TodosModel => async (todo, closed, user) => {
  const newTodo = new TodosModel({ todo, closed, user });
  const savedTodo = await newTodo.save();
  //console.log('savedz', savedTodo)
  return savedTodo;
};

const getTodos = TodosModel => async user => {
  //console.log('uuuzer', user)
  const foundTodos = await TodosModel.find({ user });
  //console.log('founds',foundTodos)
  return foundTodos;
};

module.exports = TodosModel => ({
  submitTodo: submitTodo(TodosModel),
  getTodos: getTodos(TodosModel)
});
