const { logoutUser } = require("../services");
module.exports = async (req, res, next) => {
  try {
    await logoutUser(req);
  } catch (e) {
    next(e);
  }
};
