var express = require("express");
const ProductDescription = require("../controller/ProductDescriptionController");
var router = express.Router();

router.get("/", ProductDescription.index);
router.get("/product/:slug", ProductDescription.getByProduct);
router
  .route("/:id")
  .get(ProductDescription.show)
  .put(ProductDescription.update)
  .delete(ProductDescription.delete);
router.post("/", ProductDescription.store);

module.exports = router;
