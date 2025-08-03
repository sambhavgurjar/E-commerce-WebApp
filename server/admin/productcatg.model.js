const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProductCatg = new Schema({
  pcatgid: {
    type: Number,
    required: true,
    unique: true,
  },
  pcatgname: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("ProductCatg", ProductCatg);