const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    detail: {
      type: String,
      trim: true,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const Speciality = mongoose.model("Speciality", specialitySchema);

module.exports = Speciality;
