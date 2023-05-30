const { NotFoundError } = require("@ticketifyorg/common");
const Movie = require("../model/movie");
const Redis = require("ioredis");

const client = new Redis(
  "redis://default:50c0fea972504c1cb7d6f96b69247a15@inviting-robin-36402.upstash.io:36402"
);

//GETS ALL MOVIES
module.exports.movieIndex = async (req, res) => {
  await client.get("listofMovies", async (error, result) => {
    if (error) console.error(error);

    if (result != null) {
      // console.log("There is result", result);
      return res.status(200).json(JSON.parse(result));
    }
    // console.log("No result!");
    const movies = await Movie.find({});
    client.set("listofMovies", JSON.stringify(movies), "EX", 60);
    res.status(200).send(movies);
  });
};

//ADD NEW MOVIE
module.exports.addMovie = async (req, res) => {
  try {
    const existingMovie = await Movie.find(req.body);
    if (existingMovie.length >= 1) {
      return res.status(400).send({
        success: false,
        error: "Movie exists",
      });
    }
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.status(200).send({
      success: true,
      message: "Movie added successfully",
      id: newMovie.id,
    });
  } catch (error) {
    // console.error(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//SHOW ONE MOVIE
module.exports.showMovie = async (req, res) => {
  try {
    // console.log(req.params.id);
    if (!req.params.id) {
      return res.status(404).send({
        success: false,
        error: "No ID found",
      });
    }
    const movie = await Movie.findById(req.params.id);

    res.status(200).send(movie);
  } catch (error) {
    return res.status(404).send({
      errors: [{ message: "Movie not found" }],
    });
  }
};

//UPDATE MOVIE
module.exports.updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(id, req.body);

    await movie.save();
    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
    });
  } catch (error) {
    res.status(404).send({
      errors: [{ message: "Movie not found" }],
    });
  }
};

//DELETE ONE MOVIE
module.exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    await Movie.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(404).send({
      errors: [{ message: "Something went wrong" }],
    });
  }
};

// SHOW DRAMA MOVIES ONLY
module.exports.showDrama = async (req, res) => {
  // await Movie.deleteMany({});
  const movies = await Movie.find({
    genre: {
      $all: "drama",
    },
  });

  // console.log(movies);
  res.status(200).send(movies);
};

// ACTION MOVIES ONLY
module.exports.showAction = async (req, res) => {
  // await Movie.deleteMany({});
  const movies = await Movie.find({
    genre: {
      $all: "action",
    },
  });

  // console.log(movies);
  res.status(200).send(movies);
};

// ROMANCE MOVIES ONLY
module.exports.showRomance = async (req, res) => {
  // await Movie.deleteMany({});
  const movies = await Movie.find({
    genre: {
      $all: "romance",
    },
  });

  // console.log(movies);
  res.status(200).send(movies);
};

// COMEDY MOVIES ONLY
module.exports.showComedy = async (req, res) => {
  // await Movie.deleteMany({});
  const movies = await Movie.find({
    genre: {
      $all: "comedy",
    },
  });
  // console.log(movies);
  res.status(200).send(movies);
};
