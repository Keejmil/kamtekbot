const mongoose = require("mongoose");

const thankSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  thanks: { type: Number, default: 0 },
});

module.exports = mongoose.model("thanks", thankSchema);
