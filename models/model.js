const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      index: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", userSchema);
