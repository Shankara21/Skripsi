var express = require("express");
const VariantController = require("../controller/VariantController");
var router = express.Router();

router.get("/", VariantController.index);
router.post("/", VariantController.store);
router
  .route("/:id")
  .get(VariantController.show)
  .put(VariantController.update)
  .delete(VariantController.destroy);

module.exports = router;
