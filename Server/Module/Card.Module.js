const mongoose = require("mongoose");
Subtask = require("./Subtask.Module");
// Define schema for card model
const cardSchema = new mongoose.Schema({
  //
  name: { type: String, required: true },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }], // Array of Subtask references
});

// Create models
const Card = mongoose.model("Card", cardSchema);
// Define schema for subtask model

// Export models
module.exports = { Card };
