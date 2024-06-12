const { Temperature } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const temperatures = await Temperature.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(temperatures);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const temperature = await Temperature.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!temperature) {
        return res.json({
          message: `Temperature  is not found`,
        });
      }
      res.json(temperature);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
