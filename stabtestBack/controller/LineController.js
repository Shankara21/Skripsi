const { Line } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const lines = await Line.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(lines);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const line = await Line.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!line) {
        return res.json({
          message: `Line  is not found`,
        });
      }
      res.json(line);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  store: async (req, res) => {
    try {
      const { name } = req.body;
      const line = await Line.findOne({
        where: { name },
      });
      if (line) {
        return res.status(404).json({
          message: `Line with name ${name} already exist`,
        });
      }
      const newLine = await Line.create({ name });
      res.json({
        message: "Line has been created",
        data: newLine,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const line = await Line.findByPk(id);
      if (!line) {
        return res.json({
          message: `Line  is not found`,
        });
      }
      await line.update({ name });
      res.json({
        message: `Line  has been updated`,
        data: line,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const line = await Line.findByPk(id);
      if (!line) {
        return res.json({
          message: `Line  is not found`,
        });
      }
      await line.destroy();
      res.json({
        message: `Line has been deleted`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
