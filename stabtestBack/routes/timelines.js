var express = require("express");
const TimelineController = require("../controller/TimelineController");
var router = express.Router();

router.get("/", TimelineController.index);
router.route("/:id").get(TimelineController.show);

module.exports = router;
