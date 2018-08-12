const { logOut } = require("../services");
module.exports = (req, res, next) => {
  try {
    logOut(req);
    res.json({})
  } catch (e) {
    next(e);
  }
};
