const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var State = new Schema({
  stid: {
    type: Number,
    required: true,
    unique: true,
  },
  stname: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["enable", "disable"],
    disable:"enable"
  },
});
module.exports = mongoose.model("State", State);
