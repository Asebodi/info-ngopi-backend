const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    mongoose.connect(
      process.env.DB_SECRET,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log("Database connected")
    );
    mongoose.set("useCreateIndex", true);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = dbConnect;
