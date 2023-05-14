const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");

router.get("/drama", movieController.showDrama);
router.get("/romance", movieController.showRomance);
router.get("/comedy", movieController.showComedy);
router.get("/action", movieController.showAction);

module.exports = router;
