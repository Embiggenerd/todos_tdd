const { userExists, encryptPassword, saveUser } = require('../services');

module.exports = async function(req, res, next) {
  const { username, password } = req.body;
  try {
    let existence = await userExists(username);

    if (existence) {
      throw new Error(`${username} is taken`)
    }

    if (!username ) {
      throw new Error(`Username is required`)
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
