const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

router.post(
  "/",
  [
    check("name", "Nama harus valid").not().isEmpty(),
    check("username", "Username harus valid").not().isEmpty(),
    check("password", "Password harus minimal 6 karakter").isLength({ min: 6 }),
    check("password1", "Password harus minimal 6 karakter").isLength({
      min: 6,
    }),
    check("email", "Email harus valid").isEmail(),
  ],
  async (req, res) => {
    const { name, username, email, password, password1 } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (password !== password1) {
      return res.status(400).send("Password tidak sesuai");
    }

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(401).send("Email sudah terdaftar!");
      }

      user = new User({ name, username, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        id: user.id,
      };

      jwt.sign(payload, process.env.JWT_SECRET, null, (err, token) => {
        if (err) {
          throw err;
        }
        res.json(token);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/", (req, res) => {
  res.send("It's working");
});

module.exports = router;
