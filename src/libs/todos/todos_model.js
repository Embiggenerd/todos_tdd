const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  closed: { type: Boolean, requred: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model("todo", TodosSchema);
