var express = require("express");
const ScheduleController = require("../controller/ScheduleController");
var router = express.Router();

router.get("/", ScheduleController.index);
router.get("/byProduct/:id", ScheduleController.showByProductId);
router.get("/byProduct/:productId/tempId/:tempId", ScheduleController.showByProductandTempId);
router.get("/timeline", ScheduleController.geScheduleProduct);
router.route("/:id").get(ScheduleController.show);

module.exports = router;
