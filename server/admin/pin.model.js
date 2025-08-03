const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pinSchema = new Schema(
  {
    pinid: {
      type: Number,
      required: true,
      unique: true,
    },

    pincode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["enable", "disable"],
      default: "enable",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pincode", pinSchema);
