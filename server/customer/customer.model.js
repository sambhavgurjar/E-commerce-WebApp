
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  CUserId: {
    type: String,
    required: true,
    unique: true,
  },
  CUserName: {
    type: String,
    required: true,
  },
  CUserPass: {
    type: String,
    required: true,
    trim: true,
  },
  CAddress: {
    type: String,
    required:true
  },
  CContact: {
    type: Number,
    required: true,
    unique:true
  },
  CEmail: {
    type: String,
    required: true,
    unique: true,
  },
  CPicName: {
    type: String,
    default:
      "https://image.shutterstock.com/image-vector/no-image-picture-available-on-260nw-2450891049.jpg",
  },
  Cid: {
    type: Number,
    required: true,
    unique:true
   },
  Status: {
    type: String ,
    enum: ["active", "deactive"],
    default:"active"
    
  },
  role: {
    type: String,
    default: "customer",
  },
});

module.exports = mongoose.model("Customer", customerSchema);
