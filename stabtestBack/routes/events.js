var express = require("express");
const eventController = require("../controller/eventController");
var router = express.Router();

router.get("/", eventController.index);
router.get("/weeklyEvents", eventController.weeklyEvent);
router.get("/nextChecking/:id", eventController.findNextChecking);
router.get("/emailReminder", eventController.emailReminder);
router.get("/monitoring", eventController.monitoringByProduct);
router.get("/holidays/:year", eventController.getHolidays);
router.get("/:id", eventController.show);

module.exports = router;
