const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // photo???
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorite: [
    {
      cafe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cafes",
      },
      // photo??
      cafeName: String,
      cafeGrade: Number,
      cafePrice: Number,
    },
  ],
  reviews: [
    {
      cafe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cafes",
      },
      rate: Number,
      cafeName: String,
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User);

// tambah use ObjectId, rating, posts, dll
