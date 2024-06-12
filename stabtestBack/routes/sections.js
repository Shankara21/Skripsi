var express = require("express");
const SectionController = require("../controller/SectionController");
var router = express.Router();

router.get("/", SectionController.index);


module.exports = router;
