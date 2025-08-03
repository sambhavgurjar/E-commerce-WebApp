const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var vendorSchema = new Schema({
  VUserId: {
    type: String,
    required: true,
    unique: true,
  },
  VUserName: {
    type: String,
    required: true,
  },
  VUserPass: {
    type: String,
    required: true,
    trim: true,
  },
  VAddress: {
    type: String,
    required:true
  },
  VContact: {
    type: Number,
    required: true,
    unique:true
  },
  VEmail: {
    type: String,
    required: true,
    unique: true,
  },
  VPicName: {
    type: String,
    default:
      "https://image.shutterstock.com/image-vector/no-image-picture-available-on-260nw-2450891049.jpg",
  },
  Vid: {
    type: Number,
    required: true,
    unique:true
   },
  Status: {
    type: String ,
    enum: ["active", "deactive"],
    default:"deactive"
    
  },
  role: {
    type: String,
    default: "vendor",
  },
});

module.exports = mongoose.model("Vendor", vendorSchema);
