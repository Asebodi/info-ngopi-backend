const mongoose = require("mongoose");
const Cafe = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  //   Pictures??
  cafeName: String,
  cafeGrade: Number,
  cafePrice: Number,
  location: String,
  description: String,
  avgRating: Number,
  totalReviews: Number,
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      rate: Number,
      name: String,
      // picture?
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  facility: [
    {
      outlet: Boolean,
      wifi: Boolean,
      laptopFriendly: Boolean,
      ac: Boolean,
      fan: Boolean,
      games: Boolean,
      food: Boolean,
      toilet: Boolean,
      parkingSpace: Boolean,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cafe", Cafe);
