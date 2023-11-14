const db = require("../../models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

module.exports.logIn = async (req, res) => {
  try {
    const loginDetails = await db.user.findByPk(req.query.matricNO);
    if (!loginDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    const correctPassword = await bcrypt.compare(
      req.query.password,
      loginDetails.password
    );
    if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    dotenv.config();
    const jwToken = jwt.sign(
      loginDetails.user_id,
      process.env.User_Access_Token
    );
    res.json({ accessToken: jwToken });
  } catch (error) {
    res.status(500).json({ message: "Error while logging in" });
  }
};
