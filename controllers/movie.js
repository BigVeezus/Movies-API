const { NotFoundError } = require("@ticketifyorg/common");
const Movie = require("../model/movie");

module.exports.movieIndex = async (req, res) => {
  const movies = await Movie.find({});
  //   console.log(movies);
  res.status(200).send(movies);
};

module.exports.addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.status(200).send({
      success: true,
      message: "Movie added successfully",
      id: newMovie.id,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Movie wasnt created");
  }
};

module.exports.showMovie = async (req, res) => {
  try {
    // console.log(req.params.id);
    const movie = await Movie.findById(req.params.id);

    res.status(200).send(movie);
  } catch (error) {
    return res.status(404).send({
      errors: [{ message: "Movie not found" }],
    });
  }
};

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
