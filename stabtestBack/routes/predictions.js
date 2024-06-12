var express = require("express");
const AsltController = require("../controller/AsltController");
var router = express.Router();

router.post("/calculate", AsltController.calculateData);


module.exports = router;
