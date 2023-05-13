const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();

connectDB();
app.use(cors());

app.get("/", (req, res) => {
  res.send("him");
});

app.listen(5000, () => {
  console.log(`Server running on 5000`);
});
