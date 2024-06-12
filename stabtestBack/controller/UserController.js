const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { connectLogin } = require("../config/connection");
const { QueryTypes } = require("sequelize");
const CryptoJS = require("crypto-js");

module.exports = {
  loginEmployee: async (req, res) => {
    try {
      const { nik, password } = req.body;
      const hashedPassword = CryptoJS.MD5(password).toString();

      if (nik == "" || password == "") {
        return res
          .status(400)
          .json({ message: "Please fill all fields before submit" });
      }
      const findUserByNIK = await connectLogin.query(
        `SELECT * FROM php_ms_login WHERE lg_nik = '${nik}' LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      );
      if (
        findUserByNIK.length === 0 ||
        findUserByNIK[0].lg_password !== hashedPassword
      ) {
        return res
          .status(400)
          .json({ message: "Please check your NIK or Password" });
      }
      const response = await connectLogin.query(
        `SELECT * FROM php_ms_login WHERE lg_nik = '${nik}' AND lg_password = '${hashedPassword}' AND lg_aktif = '1' LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      );
      if (response.length === 0) {
        return res
          .status(400)
          .json({ message: "Please check your NIK or Password" });
      }
      const data = {
        nik: response[0].lg_nik,
        name: response[0].lg_name,
        email: response[0].lg_email_aio,
        isEmployee: true,
      };
      const token = jwt.sign(data, process.env.SECRET_KEY);

      res.status(200).json({
        token,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
