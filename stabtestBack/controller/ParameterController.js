const { Parameter } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const parameters = await Parameter.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(parameters);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const parameter = await Parameter.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!parameter) {
        return res.json({
          message: `Parameter  is not found`,
        });
      }
      res.json(parameter);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const parameter = await Parameter.findOne({
        where: { name },
      });
      if (parameter) {
        return res.status(404).json({
          message: `Parameter with name ${name} already exist`,
        });
      }
      const newParameter = await Parameter.create({ name });
      res.json({
        message: "Parameter has been created",
        data: newParameter,
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
      const parameter = await Parameter.findByPk(id);
      if (!parameter) {
        return res.status(404).json({
          message: `Parameter  is not found`,
        });
      }
      await parameter.update({ name });
      res.json({
        message: `Parameter  has been updated`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const parameter = await Parameter.findByPk(id);
      if (!parameter) {
        return res.status(404).json({
          message: `Parameter  is not found`,
        });
      }
      await parameter.destroy();
      res.json({
        message: `Parameter  has been deleted`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
