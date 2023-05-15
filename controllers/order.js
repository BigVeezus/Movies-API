const Movie = require("../model/movie");

// RANK MOVIE BY ASCENDING ORDER
module.exports.ascendingYear = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ year: 1 });
    //   console.log(movies);
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// RANK MOVIE BY DESCENDING ORDER
module.exports.descendingYear = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ year: -1 });
    //   console.log(movies);
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// RANK MOVIE BY ASCENDING SCORE
module.exports.ascendingScore = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ score: 1 });
    //   console.log(movies);
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// RANK MOVIE BY DESCENDING SCORE
module.exports.descendingScore = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ score: -1 });
    //   console.log(movies);
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
