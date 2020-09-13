const express = require("express");
const app = express();

const connectDb = require("./database/db");
app.use(express.json());
require("dotenv").config();

const register = require("./routes/register");
const login = require("./routes/login");

const PORT = process.env.PORT || 4500;

connectDb();

app.use("/register", register);
app.use("/login", login);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
