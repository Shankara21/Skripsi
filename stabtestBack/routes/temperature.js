var express = require("express");
const TemperatureController = require("../controller/TemperatureController");
var router = express.Router();

router.get("/", TemperatureController.index);
router.route("/:id").get(TemperatureController.show);

module.exports = router;
