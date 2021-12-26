const Speciality = require("../Models/SpecialityModel");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { name, detail } = req.body;
    const speciality = new Speciality({ name, detail });
    // await speciality.save()
    console.log(speciality);
    res.status(200).send("speciality Added");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
