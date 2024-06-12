const {
  Product,
  Variant,
  ProductDescription,
  ProductDescParamsStd,
} = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const productDescriptions = await ProductDescription.findAll({
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
      });
      // setTimeout(() => {
      // }, 2000);
      res.json(productDescriptions);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const productDescription = await ProductDescription.findByPk(id, {
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
      });
      res.json(productDescription);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  store: async (req, res) => {
    try {
      const { productId, variantId, parameters } = req.body;
      const productDescription = await ProductDescription.create({
        productId,
        variantId,
      });
      parameters.forEach(async (item) => {
        await ProductDescParamsStd.create({
          productDescId: productDescription.id,
          parameterId: item,
        });
      });
      res.json({
        message: "Product description created successfully",
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const productDescription = await ProductDescription.findByPk(id);
      if (!productDescription) {
        return res.json({
          message: `Product description  is not found`,
        });
      }
      const productDescParamsStd = await ProductDescParamsStd.findAll({
        where: {
          productDescId: id,
        },
      });
      productDescParamsStd.forEach(async (item) => {
        await item.destroy();
      });
      await productDescription.destroy();
      res.json({
        message: `Product description has been deleted`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { parameters, productId, variantId } = req.body;
      const productDescription = await ProductDescription.findByPk(id);
      if (!productDescription) {
        return res.status(404).json({
          message: `Product description  is not found`,
        });
      }
      await productDescription.update({
        productId,
        variantId,
      });
      const productDescParamsStd = await ProductDescParamsStd.findAll({
        where: {
          productDescId: id,
        },
      });
      productDescParamsStd.forEach(async (item) => {
        await item.destroy();
      });
      parameters.forEach(async (item) => {
        await ProductDescParamsStd.create({
          productDescId: productDescription.id,
          parameterId: item,
        });
      });
      res.status(200).json({
        message: `Product description has been updated`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  getByProduct: async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: {
          slug,
        },
      });
      if (!product) {
        return res.status(404).json({
          message: `Product with slug ${slug} is not found`,
        });
      }
      const productDescription = await ProductDescription.findAll({
        where: {
          productId: product.id,
        },
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
      });
      res.status(200).json(productDescription);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
