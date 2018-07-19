const { hash } = require('bcrypt');

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

module.exports = UserModel => ({
  saveUser: saveUser(UserModel),
  userExists: userExists(UserModel),
  encryptPassword: encryptPassword(UserModel)
});
