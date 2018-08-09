const { userExists, encryptPassword, saveUser } = require("../services");

module.exports = async function(req, res, next) {
  const { username, password } = req.body;
  try {
    let existence = await userExists(username)
    if (existence) {
      return res.status(400).json({ error: `${username} is taken` })
    
    }
    const encryptedPassword = await encryptPassword(password);

    const savedUser = await saveUser(username, encryptedPassword);

    res.redirect("/user/login");
  } catch (e) {
    next(e);
  }
};
