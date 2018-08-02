const { submitTodo } = require('../services');
module.exports = async (req, res, next) => {
  // run submit_todo on user inputs
  const { todo, closed }  = req.body
  const user = req.session.userId
  
  try {
    const submittedTodo = await submitTodo(todo, closed, user);
    res.json(submittedTodo);
  } catch (e) {
    next(e);
  }
};
