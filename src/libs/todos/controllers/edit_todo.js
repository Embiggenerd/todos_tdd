const { editTodo } = require('../services')

module.exports = async (req, res, next) => {
    const { todo, closed, _id } = req.body;
    try {
      const editedTodo = await editTodo(todo, _id);
      return res.json(editedTodo);
    } catch (e) {
      next(e);
    }
  };