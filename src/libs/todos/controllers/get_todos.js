const { getTodos } = require('../services');
module.exports = async (req, res, next) => {
  const foundTodos = await getTodos(req.session.userId);
  res.json({todos: foundTodos});
};
