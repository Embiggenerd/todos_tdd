const { userExists, encryptPassword, saveUser } = require('../services');

module.exports = async function(req, res, next) {
  const { username, password } = req.body;
  try {
    let existence = await userExists(username);
    if (existence) {
      console.log(username, 'already exists')
      return res.status(400).json({
        error: {
          name: 'YOU DONE GOOFED',
          message: `${username} is taken!`
        }
      });
    }
    const encryptedPassword = await encryptPassword(password);

    const savedUser = await saveUser(username, encryptedPassword);

    res.json({
      user: {
        id: savedUser.id,
        username: savedUser.username
      }
    });
  } catch (e) {
    next(e);
  }
};
