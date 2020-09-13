const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

router.post(
  "/",
  [
    check("password", "Password harus minimal 6 karakter").not().isEmpty(),
    check("email", "Email harus valid").isEmail(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send("Email tidak terdaftar!");
      }

      const isCorrect = await bcrypt.compare(password, user.password);

      if (!isCorrect) {
        return res.status(401).send("Password salah!");
      }

      const payload = {
        id: user.id,
      };

      jwt.sign(payload, process.env.JWT_SECRET, null, (err, token) => {
        if (err) {
          throw err;
        }
        res.send(token);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
