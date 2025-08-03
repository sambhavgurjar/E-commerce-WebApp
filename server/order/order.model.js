const mongoose = require("mongoose");
const { ProductSchema } = require("../product/product.model.js");

const orderSchema = new mongoose.Schema(
  {
    oid: {
      type: Number,
      required: true,
      unique: true,
    },
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    vid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    qty: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      min: 0,
    },
    paid: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    billid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["placed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    deliveryDate: {
      type: Date,
    },
    orderAdd: {
      pincode: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
