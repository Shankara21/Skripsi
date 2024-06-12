var express = require("express");
const ParameterController = require("../controller/ParameterController");
var router = express.Router();

router.get("/", ParameterController.index);
router.post("/", ParameterController.create);
router
  .route("/:id")
  .get(ParameterController.show)
  .put(ParameterController.update)
  .delete(ParameterController.destroy);

module.exports = router;
