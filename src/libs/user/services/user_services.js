const { hash, compare } = require('bcrypt');

const saveUser = UserModel => async (username, password) => {
  const NewUser = new UserModel({ username, password });
  const SavedUser = await NewUser.save();
  return SavedUser;
};

const userExists = UserModel => async username => {
  const userCount = await UserModel.countDocuments({ username });
  if (userCount > 0) {
    return true;
  }
  return false;
};

const encryptPassword = UserModel => password => hash(password, 2);

const validateUser = UserModel => async (username, password) => {
  let payload;
  const foundUser = await UserModel.findOne({ username });
  if (foundUser) {
    const passwordsMatch = await compare(password, foundUser.password);
    if (passwordsMatch) {
      payload = foundUser.id;
    }
  }
  return payload;
};

const loginUser = UserModel => (userId, req) => (req.session.userId = userId);

module.exports = UserModel => ({
  saveUser: saveUser(UserModel),
  userExists: userExists(UserModel),
  encryptPassword: encryptPassword(UserModel),
  validateUser: validateUser(UserModel),
  loginUser: loginUser(UserModel)
});
