const { Variant } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const variants = await Variant.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(variants);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const variant = await Variant.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!variant) {
        return res.json({
          message: `Variant  is not found`,
        });
      }
      res.json(variant);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  store: async (req, res) => {
    try {
      const { name } = req.body;
      const variant = await Variant.findOne({
        where: { name },
      });
      if (variant) {
        return res.status(404).json({
          message: `Variant with name ${name} already exist`,
        });
      }
      const newVariant = await Variant.create({ name });
      res.json({
        message: "Variant has been created",
        data: newVariant,
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
      const variant = await Variant.findByPk(id);
      if (!variant) {
        return res.status(404).json({
          message: `Variant  is not found`,
        });
      }
      await variant.update({ name });
      res.json({
        message: "Variant has been updated",
        data: variant,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const variant = await Variant.findByPk(id);
      if (!variant) {
        return res.json({
          message: `Variant  is not found`,
        });
      }
      await variant.destroy();
      res.json({
        message: `Variant  has been deleted`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
