const { validateUser, loginUser } = require('../services');

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await validateUser(username, password);
    if (validUser) {
      await loginUser(validUser.id, req);
      return res.json({ user: validUser });
    }

    res.status(400).json({
      error: {
        name: 'YOU DONE GOOFED',
        message: 'Click out and try again!'
      }
    });
  } catch (e) {
    next(e);
  }
};
