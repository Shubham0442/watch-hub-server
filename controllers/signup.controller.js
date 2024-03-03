const { Router } = require("express");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const signupController = Router();

signupController.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    bcrypt.hash(password, 8, async function (err, hash) {
      if (err) {
        res.status(500).send({ msg: "something went wrong!" });
      } else {
        const newUser = User({ firstname, lastname, email, password: hash });
        await newUser.save();
        res.status(200).send({ msg: "Signup Successfully!" });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong!" });
  }
});

module.exports = { signupController };
