const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the subtask
  update: { type: Boolean, default: false }, // Flag to indicate if the subtask needs to be updated
});
const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = Subtask;
