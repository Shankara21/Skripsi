var express = require("express");
const LogCalculationController = require("../controller/LogCalculationController");
var router = express.Router();

router.get("/:dataStabilityId", LogCalculationController.index);
router.get(
  "/parameter/:parameterId/dataStability/:dataStabilityId",
  LogCalculationController.show
);
router.post("/", LogCalculationController.store);

module.exports = router;
