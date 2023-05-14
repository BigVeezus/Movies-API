const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.get("/year-ascending", orderController.ascendingYear);
router.get("/year-descending", orderController.descendingYear);
router.get("/score-ascending", orderController.ascendingScore);
router.get("/score-descending", orderController.descendingScore);

module.exports = router;
