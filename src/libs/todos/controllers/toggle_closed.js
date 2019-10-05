const { toggleClosed } = require("../services");

module.exports = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const toggledTodo = await toggleClosed(_id);
    res.json(toggledTodo)
  } catch (e) {
    next(e);
  }
};
