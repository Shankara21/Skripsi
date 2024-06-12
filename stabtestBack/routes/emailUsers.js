var express = require("express");
const EmailUserController = require("../controller/EmailUserController");
var router = express.Router();

router.get("/", EmailUserController.index);
router.get("/section/:sectionId", EmailUserController.getBySection);
router.get("/admin", EmailUserController.getAdmin);
router
  .route("/:id")
  .get(EmailUserController.show)
  .put(EmailUserController.update)
  .delete(EmailUserController.destroy);
router.post("/", EmailUserController.store);

module.exports = router;
