const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validateRequest } = require("@ticketifyorg/common");
const movieController = require("../controllers/movie");

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("genre").toLowerCase(),
    body("year")
      .isFloat({
        gt: 1900,
      })
      .withMessage("Year must be greater than 1900"),
    body("score")
      .notEmpty()
      .isFloat({
        min: 0,
        max: 10,
      })
      .withMessage("Score must be between 0 to 10"),
  ],
  validateRequest,
  movieController.addMovie
);

module.exports = router;
