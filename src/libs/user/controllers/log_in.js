const { validateUser, loginUser } = require('../services');

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const validUser = await validateUser(username, password);

    if (validUser) {
      await loginUser(validUser.id, req);
      return res.json({ user: validUser });
    }

    throw new Error('Try again')

  } catch (e) {
    next(e);
  }
};
