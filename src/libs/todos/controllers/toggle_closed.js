const { toggleClosed } = require("../services");

module.exports = async (req, res, next) => {
  const { id } = req.body;
  try {
    const toggledTodo = await toggleClosed(id);
    res.json({todo:toggledTodo})
  } catch (e) {
    next(e);
  }
};
