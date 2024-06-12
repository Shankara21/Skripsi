var express = require("express");
const LineController = require("../controller/LineController");
var router = express.Router();

router.get("/", LineController.index);
router.route("/:id")
  .get(LineController.show)
  .put(LineController.update)
  .delete(LineController.destroy);
router.post("/", LineController.store);

module.exports = router;
