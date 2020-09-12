const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
require("dotenv").config();

const register = require("./routes/register");

const PORT = process.env.PORT || 4500;

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
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

app.use("/register", register);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
