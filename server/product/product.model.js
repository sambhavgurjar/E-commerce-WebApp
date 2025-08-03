var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  pid: {
    type: Number,
    required: true,
    unique: true,
  },
  pname: {
    type: String,
    required: true,
    trim:true
  },
  pprice: {
    type: Number,
    required: true,
    min: 0
  },
  oprice: {
    type: Number,
    default: function(){
      return this.pprice;
    },
  },
  ppicname: {
    type: String,
    default:
      "https://image.shutterstock.com/image-vector/no-image-picture-available-on-260nw-2450891049.jpg",
  },
  vid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  pcatgid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCatg",
    required: true,
  },
  status: {
    type: String ,
    enum: ["available", "unavailable"],
    default:"available"
  },
});
module.exports = {
  Product: mongoose.model("Product", ProductSchema),
  ProductSchema,
};
