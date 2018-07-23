const { validateUser, loginUser } = require('../services');

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await validateUser(username, password);
    if (validUser) {
      loginUser(validUser, req);
      return res.redirect('/todos');
    }
    res.redirect('/401');
  } catch (e) {
    next(e);
  }
};
