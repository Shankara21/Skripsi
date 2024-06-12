var express = require("express");
const ProductController = require("../controller/ProductController");
var router = express.Router();

router.get("/", ProductController.index);
router.get("/slug/:slug", ProductController.showBySlug);
router
  .route("/:id")
  .get(ProductController.show)
  .put(ProductController.update)
  .delete(ProductController.destroy);
router.post("/", ProductController.store);

module.exports = router;
