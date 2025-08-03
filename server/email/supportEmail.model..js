const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const supportEmailSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userRole: {
      type: String,
      enum: ["admin", "customer", "vendor"],
      required: true,
    },
    userId: {
      type: String,
      trim: true,
      required: function () {
        return this.userRole === "admin" ? false : true;
      },
      default: function () {
        return this.userRole === "admin" ? null : null;
      },
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); 

module.exports = mongoose.model("SupportEmail", supportEmailSchema);
