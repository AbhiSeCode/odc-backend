const Admin = require("../Models/AdminModel");
const createJWT = require("../Utils/createJWT");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const verifyToken = require("../Middleware/verify");

router.post("/register", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/all", verifyToken, async (req, res) => {
  try {
    if (req.error) throw req.error;
    console.log(req.user);
    const admins = await Admin.find({});
    res.status(200).send(admins);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
