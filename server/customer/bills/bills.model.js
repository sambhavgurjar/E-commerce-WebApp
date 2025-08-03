const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    oid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    razorpayPaymentId: {
      type: String,
      trim: true,
    },
    razorpayOrderId: {
      type: String,
      trim: true,
    },
    razorpaySignature: {
      type: String,
      trim: true,
    },
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    billid: {
      type: Number,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      min: 0,
      default: 0,
    },
    vid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    orderDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default:"unpaid"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", billSchema);
