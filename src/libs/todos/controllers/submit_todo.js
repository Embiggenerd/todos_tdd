const { submitTodo } = require('../services');

module.exports = async (req, res, next) => {
  const { todo, closed } = req.body;
  const user = req.session.userId;
  try {
    const submittedTodo = await submitTodo(todo, closed, user);
    return res.json(submittedTodo);
  } catch (e) {
    next(e);
  }
};
