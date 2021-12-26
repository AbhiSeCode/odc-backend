const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    //1=>Viewer( Read), 2=>Local Admin(Read,approve and initiate refund), 3=> Global Admin(all power as Local Admin plus can create other admin)
    permission: {
      type: Number,
      required: true,
    },
    tokens: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
