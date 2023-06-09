if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler, NotFoundError } = require("@ticketifyorg/common");
const app = express();
const path = require("path");
const indexMovieRouter = require("./routes/index");
const addMovieRouter = require("./routes/addMovie");
const showMovieRouter = require("./routes/showMovie");
const updateMovieRouter = require("./routes/updateMovie");
const deleteMovieRouter = require("./routes/deleteMovie");
const genreMovieRouter = require("./routes/genre");
const sortMovieRouter = require("./routes/sortOrderMovie");

app.use(cors()); //Allows extenal access to API
app.use(express.json());
app.use(errorHandler);

// Imported Routes
app.use("/api/movies", indexMovieRouter);
app.use("/api/movies", showMovieRouter);
app.use("/api/movies", updateMovieRouter);
app.use("/api/movies", deleteMovieRouter);
app.use("/api/movies/sort", sortMovieRouter);
app.use("/api/movies/genre", genreMovieRouter);
app.use("/api/movies/new", addMovieRouter);

// Default Home Endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// SHows API report, performance and Profile
app.get("/clinic-report", (req, res) => {
  res.sendFile(path.join(__dirname + "/.clinic/17537.clinic-doctor.html"));
});
// Returns error for unavailable endpoints
app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
