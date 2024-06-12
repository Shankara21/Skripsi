const { Op } = require("sequelize");
const {
  ProductDescParamsStd,
  ProductDescription,
  Parameter,
  Product,
  Variant,
} = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const productDescParamsStds = await ProductDescParamsStd.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Product,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Variant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Parameter,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(productDescParamsStds);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const productDescParamsStd = await ProductDescParamsStd.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Product,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Variant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Parameter,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (!productDescParamsStd) {
        return res.json({
          message: `ProductDescParamsStd  is not found`,
        });
      }
      res.json(productDescParamsStd);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  getByProductDescId: async (req, res) => {
    try {
      const { id } = req.params;
      const productDescParamsStds = await ProductDescParamsStd.findAll({
        where: {
          productDescId: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Product,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Variant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Parameter,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (!productDescParamsStds) {
        return res.json({
          message: `ProductDescParamsStd with product description id ${id} is not found`,
        });
      }
      res.json(productDescParamsStds);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { standard, standardType } = req.body;
      const productDescParamsStd = await ProductDescParamsStd.findByPk(id);
      if (!productDescParamsStd) {
        return res.json({
          message: `ProductDescParamsStd  is not found`,
        });
      }
      await productDescParamsStd.update({
        standard,
        standardType,
      });
      res.json({
        message: `Data updated successfully`,
        data: productDescParamsStd,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const productDescParamsStd = await ProductDescParamsStd.findByPk(id);
      if (!productDescParamsStd) {
        return res.json({
          message: `ProductDescParamsStd  is not found`,
        });
      }
      await productDescParamsStd.destroy();
      res.json({
        message: `Data has been deleted`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
