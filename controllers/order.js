const Movie = require("../model/movie");

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
