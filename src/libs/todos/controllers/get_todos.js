const { getTodos } = require('../services');
module.exports = async (req, res, next) => {
  try {
    const foundTodos = await getTodos(req.session.userId);
    res.json({ todos: foundTodos });
  } catch (e) {
    next(e);
  }
};
