var express = require("express");
const UserController = require("../controller/UserController");
var router = express.Router();

/* GET users listing. */

router.post("/login", UserController.loginEmployee);

module.exports = router;
