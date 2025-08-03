const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  stid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  pinid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pincode",
    required: true,
  },
  ctid: {
    type: Number,
    required: true,
    unique: true, 
  },
  ctname: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["enable", "disable"],
    default: "enable",
  },
});

module.exports = mongoose.model("City", citySchema);
