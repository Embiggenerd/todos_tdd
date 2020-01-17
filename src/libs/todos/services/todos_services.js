const submitTodo = TodosModel => async (todo, closed, user) => {
  let payload;
  const newTodo = new TodosModel({ todo, closed, user });
  const savedTodo = await newTodo.save();
  if (savedTodo) {
    payload = savedTodo;
  }
  return payload;
};

const getTodos = TodosModel => async user => {
  const foundTodos = await TodosModel.find({ user });
  return foundTodos;
};

const toggleClosed = TodosModel => async id => {
  const foundTodos = await TodosModel.findById(id);
  foundTodos.closed = !foundTodos.closed;
  savedTodo = await foundTodos.save();
  return savedTodo;
};

const deleteTodo = TodosModel => async id => {
  const deletedTodo = await TodosModel.findByIdAndDelete(id);
  return deletedTodo;
};

const editTodo = TodosModel => async (todoText, id) => {
  const filter = { _id: id }
  const update = { todo: todoText }
  const todoToEdit = await TodosModel.findOneAndUpdate(filter, update, {
    new: true
  })
  console.log('todoToEdit', todoToEdit)
  return todoToEdit
}

module.exports = TodosModel => ({
  deleteTodo: deleteTodo(TodosModel),
  toggleClosed: toggleClosed(TodosModel),
  submitTodo: submitTodo(TodosModel),
  getTodos: getTodos(TodosModel),
  editTodo: editTodo(TodosModel)
});
