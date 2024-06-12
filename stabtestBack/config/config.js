require("dotenv").config();
const { DBNAME_DEV, USERNAME_DEV, PASSWORD_DEV, HOST_DEV, DIALECT_DEV } =
  process.env;
module.exports = {
  development: {
    username: USERNAME_DEV,
    password: PASSWORD_DEV,
    database: DBNAME_DEV,
    host: HOST_DEV,
    dialect: DIALECT_DEV,
  },
  test: {
    username: "root",
    password: null,
    database: "stabtest_technical",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "iot_prod",
    password: "123456",
    database: "stabtest_technical",
    host: "192.168.9.47",
    dialect: "mysql",
  },
  prod: {
    username: "iot_prod",
    password: "123456",
    database: "stabtest_technical",
    host: "192.168.9.47",
    dialect: "mysql",
  },
  login: {
    username: "iot_prod",
    password: "123456",
    database: "aio_employee",
    host: "192.168.9.47",
    port: "3306",
    dialect: "mysql",
  },
};
