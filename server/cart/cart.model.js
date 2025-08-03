const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ProductSchema } = require("../product/product.model"); 


const cartSchema = new Schema(
  {
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    cartid: {
      type: Number,
      required: true,
      unique:true
    },
    qty: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
