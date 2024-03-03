const { Router } = require("express");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginController = Router();

loginController.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt?.compare(password, user?.password, function (err, result) {
        if (err) {
          console.log("err", err);
          res.status(401).send({ msg: "Login fail!" });
        } else if (result === true) {
          const token = jwt.sign({ userId: user?._id }, process.env.SECRET_KEY);
          res.status(201).send({
            msg: "Login Successful!",
            token: token,
            user: {
              id: user?._id,
              firstname: user?.firstname,
              lastname: user?.lastname,
              email: user?.email
            }
          });
        } else res.status(401).send({ msg: "Login fail!" });
      });
    } else res.status(404).send({ msg: "User Not Found" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = { loginController };
