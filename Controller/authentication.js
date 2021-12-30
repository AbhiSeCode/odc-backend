const verifyToken = require("../Middleware/verify");
const Admin = require("../Models/AdminModel");
const createJWT = require("../Utils/createJWT");
const bcrypt = require("bcryptjs");
export const login = async (req, res) => {
  try {
    const {logiFor} = req.body
    if(logiFor == 'doctor'){
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email }).exec();
        if (!admin) {
          throw new Error("Credentials are wrong");
        }
        const passwordCheck = await bcrypt.compare(password, admin.password);
        if (!passwordCheck) {
          throw new Error("Credentials are wrong");
        }
        const token = await createJWT(admin._id.toString(), "Admin");
        await Admin.updateOne({ _id: admin._id }, { $push: { tokens: token } });
        res.status(200).send({ token });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const signUp = async (req, res) => {
  try {
    const {regiFor} = req.body
    if(regiFor == 'doctor'){
        const { userName, email, permission, mobile, address } = req.body;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const admin = new Admin({
          userName,
          email,
          permission,
          password,
          mobile,
          address,
        });
        await admin.save();
        res.status(200).send("Admin Registered");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
