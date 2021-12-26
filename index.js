const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const adminRoute = require("./Routes/admin");
const specialityRoute = require("./Routes/speciality");
const port = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected");
});

app.use(express.json());
app.use(cors());
app.use("/admin", adminRoute);
app.use("/speciality", specialityRoute);
app.listen(port, () => console.log(`Listening on port ${port}`));
