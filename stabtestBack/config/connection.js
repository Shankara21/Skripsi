const sequelize = require("sequelize");
const { login } = require("./config");

exports.connectLogin = new sequelize(
  login.database,
  login.username,
  login.password,
  login
);
