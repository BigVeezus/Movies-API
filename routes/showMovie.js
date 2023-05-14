const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");

router.get("/:id", movieController.showMovie);

module.exports = router;
