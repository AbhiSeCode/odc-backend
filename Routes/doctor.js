const authentication = require('../Controller/authentication')
const Admin = require("../Models/AdminModel");
const router = require("express").Router();

router.post("/register", authentication.signUp)

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

router.post("/login", authentication.login)

module.exports = router;
