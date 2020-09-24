const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const Cafe = require("../models/Cafe.model");
const User = require("../models/User.model");

// ADD NEW FAVORITE
router.post("/favorite/:cafe_id", auth, async (req, res) => {
  const cafeId = req.params.cafe_id;

  try {
    const cafe = await Cafe.findById(cafeId);

    if (!cafe) {
      return res.status(404).send("Kedai kopi tidak ditemukan");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan");
    }

    const cafeFavorite = {
      cafe: cafeId,
      cafeName: cafe.cafeName,
      cafeGrade: cafe.cafeGrade,
      cafePrice: cafe.cafePrice,
    };

    user.favorite.unshift(cafeFavorite);

    await user.save();

    res.json(user.favorite);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// DELETE FAVORITE
router.delete("/favorite/:cafe_id", auth, async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.cafe_id);

    if (!cafe) {
      return res.status(404).send("Kedai kopi tidak ditemukan");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan");
    }

    if (
      user.favorite.map((cafe) => cafe.cafe === req.params.cafe_id).length === 0
    ) {
      return res.status(400).send("Kedai kopi tidak ada di favorit");
    }

    const removeIndex = user.favorite.indexOf(req.params.cafe_id);

    user.favorite.splice(removeIndex, 1);

    await user.save();

    res.json(user.favorite);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// GET FAVORITE
router.get("/favorite", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan");
    }

    res.json(user.favorite);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// EDIT PROFILE INFO
router.post("/profile-update", auth, async (req, res) => {
  // body destructure here
  const { name, userName, email } = req.body;
  //   photo????

  const updates = [
    {
      title: "name",
      value: name,
    },
    { userName },
    { email },
  ];

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});
