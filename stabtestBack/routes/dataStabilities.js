var express = require("express");
const DataStabilityController = require("../controller/DataStabilityController");
var router = express.Router();

router.get("/", DataStabilityController.index);
router.get("/product/:slug", DataStabilityController.getByProduct);
router.get("/countBySection", DataStabilityController.countBySection);
router.get("/countByStatus", DataStabilityController.countByStatus);
router.get("/countByYear", DataStabilityController.countByYear);
router.get("/getByProductDesc/:id", DataStabilityController.getByProductDesc);
router.get(
  "/lotNumber/:lotNumber/slug/:slug",
  DataStabilityController.getByLotNumber
);
router
  .route("/:id")
  .get(DataStabilityController.show)
  .put(DataStabilityController.update)
  .delete(DataStabilityController.delete);
router.post("/", DataStabilityController.store);

module.exports = router;

