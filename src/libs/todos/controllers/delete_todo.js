const { deleteTodo } = require("../services");
module.exports = async (req, res, next) => {
  const { id } = req.body;
  try {
    const deletedTodo = await deleteTodo(id);
    res.json({ todo: deletedTodo });
  } catch (e) {
    next(e);
  }
};
