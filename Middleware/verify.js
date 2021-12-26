const jwt = require("jsonwebtoken");
const Admin = require("../Models/AdminModel");
const Doctor = require("../Models/doctorModel");
const Patient = require("../Models/patientModel");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization.replace("Bearer ", "");
    const authData = await jwt.verify(token, process.env.JWT_SIGN);
    let user;
    switch (authData.user) {
      case "Admin":
        user = await Admin.findById(authData._id);
        if (!user) {
          throw new Error("Token is invalid");
        }
        break;
      case "Patient":
        user = await Patient.findById(authData._id);
        if (!user) {
          throw new Error("Token is invalid");
        }
        break;
      case "Doctor":
        user = await Doctor.findById(authData._id);
        if (!user) {
          throw new Error("Token is invalid");
        }
        break;
    }
    req.user = user;
    next();
  } catch (error) {
    req.error = error;
    next();
  }
};

module.exports = verifyToken;
