const { userExists, encryptPassword, saveUser } = require('../services');

module.exports = async function(req, res, next) {
  const { username, password } = req.body;
  try {
    // check if user exists
    if (userExists(username)) res.json({ error: `${username} is taken` });

    // if new
    // encrypt password
    const encryptedPassword = await encryptPassword(password);
    // save username, encrypted password
    const savedUser = saveUser(username, encryptedPassword);
    res.redirect('/login');
  } catch (e) {
    next(e);
  }
};
