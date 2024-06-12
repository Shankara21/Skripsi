var express = require("express");
const productDescParamsStdController = require("../controller/productDescParamsStdController");
var router = express.Router();

router.get("/", productDescParamsStdController.index);
router.get("/prodDesc/:id", productDescParamsStdController.getByProductDescId);
// router.get("/:id", productDescParamsStdController.show);
router.route("/:id")
  .get(productDescParamsStdController.show)
  .put(productDescParamsStdController.update)
  .delete(productDescParamsStdController.delete);

module.exports = router;
