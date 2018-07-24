const {submitTodo} = require('../services')
module.exports = async (req, res, next)  => {
  // run submit_todos on user inputs
  const {todo, closed, user } = req.body
  try {
    const submittedTodo = await submitTodo(todo, closed, user)
    res.json(submittedTodo)
  } catch(e) {
    next(e)
  }
};
