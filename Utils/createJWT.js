const jwt = require("jsonwebtoken");

const createJWT = async (id, user) => {
  console.log("JWT", id);
  return jwt.sign({ _id: id, user }, process.env.JWT_SIGN, {
    expiresIn: "168h",
  });
};

module.exports = createJWT;
