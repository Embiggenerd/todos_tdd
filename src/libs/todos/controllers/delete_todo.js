const { deleteTodo } = require("../services");

module.exports = async (req, res, next) => {
  const { _id } = req.body;
  console.log('delete_todoz', req.body)
  try {
    const deletedTodo = await deleteTodo(_id);
    res.json(deletedTodo);
  } catch (e) {
    next(e);
  }
};
