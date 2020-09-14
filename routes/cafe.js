const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const Cafe = require("../models/Cafe.model");

router.get("/", async (req, res) => {
  if (!req.query) {
    try {
      const cafes = await Cafe.find();
      return res.json(cafes);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }

  try {
    //   filter here
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// TO IMPORT A CAFE
router.post(
  "/",
  [
    auth,
    check("cafeGrade", "Rating cafe invalid").isInt(),
    check("cafePrice", "Range harga cafe tidak valid").isInt(),
    check("cafeName", "Nama cafe harus ada").not().isEmpty(),
  ],
  async (req, res) => {
    // server side validation, averaging, 0 initial review, etc etc
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cafeName, cafeGrade, cafePrice, location, description } = req.body;

    const avgRating = 0;
    const totalReviews = 0;

    const cafeDetails = {
      user: req.user.id,
      cafeName,
      cafeGrade,
      cafePrice,
      location,
      description,
      avgRating,
      totalReviews,
      reviews: [],
    };

    try {
      const cafe = new Cafe(cafeDetails);

      await cafe.save();

      res.send(cafe.id);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

// RATE A CAFE
router.post(
  "/:cafe_id",
  [
    auth,
    check("rate", "Rating harus ada").not().isEmpty(),
    check("name", "Nama harus ada").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const cafe = await Cafe.findById(req.params.cafe_id);
      if (!cafe) {
        return res.status(404).send("Cafe tidak ditemukan");
      }

      const { rate, name, comment } = req.body;

      const addRating = {
        user: req.user.id,
        rate,
        name,
        comment: comment ? comment : "",
      };

      cafe.reviews.unshift(addRating);

      let ratingSum = 0;
      const reviewSum = cafe.reviews.length;

      cafe.reviews.forEach((rating) => {
        ratingSum = ratingSum + rating;
      });

      cafe.avgRating = ratingSum / reviewSum;
      cafe.totalReviews = reviewSum;

      await cafe.save();

      res.json(cafe);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
