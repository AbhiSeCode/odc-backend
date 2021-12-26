const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
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
    },
    notes: [{ note: { type: String }, from: { type: String } }],
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
