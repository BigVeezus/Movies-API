const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");

router.delete("/:id", movieController.deleteMovie);

module.exports = router;
