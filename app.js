if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler, NotFoundError } = require("@ticketifyorg/common");
const app = express();
const indexMovieRouter = require("./routes/index");
const addMovieRouter = require("./routes/addMovie");
const showMovieRouter = require("./routes/showMovie");
const updateMovieRouter = require("./routes/updateMovie");
const deleteMovieRouter = require("./routes/deleteMovie");

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/movies", indexMovieRouter);
app.use("/api/movies", showMovieRouter);
app.use("/api/movies", updateMovieRouter);
app.use("/api/movies", deleteMovieRouter);
app.use("/api/movies/new", addMovieRouter);

app.get("/", (req, res) => {
  res.send("MOVIES API");
});

app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
