const { Product, Schedule } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const products = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(products);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!product) {
        return res.json({
          message: `Product  is not found`,
        });
      }
      res.json(product);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  store: async (req, res) => {
    try {
      const { name, in30degree, in40degree, in50degree } = req.body;
      const product = await Product.create({
        name,
        code: name.toUpperCase().replace(/\s/g, ""),
      });
      in30degree.forEach(async (item) => {
        item.productId = product.id;
        item.timelineId = item.id;
        item.temperatureId = 1;
      });
      in40degree.forEach(async (item) => {
        item.productId = product.id;
        item.timelineId = item.id;
        item.temperatureId = 2;
      });
      in50degree.forEach(async (item) => {
        item.productId = product.id;
        item.timelineId = item.id;
        item.temperatureId = 3;
      });
      data = [...in30degree, ...in40degree, ...in50degree];
      data = data.map((item) => {
        return {
          productId: item.productId,
          timelineId: item.timelineId,
          temperatureId: item.temperatureId,
        };
      });
      await Schedule.bulkCreate(data);
      return res.json({
        message: `Product with name ${name} has been created`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, in30degree, in40degree, in50degree } = req.body;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.json({
          message: `Product  is not found`,
        });
      }
      await product.update({
        name,
        code: name.toUpperCase().replace(/\s/g, ""),
      });
      in30degree.forEach(async (item) => {
        item.productId = product.id;
        item.timelineId = item.id;
        item.temperatureId = 1;
      });
      in40degree.forEach(async (item) => {
        item.productId = product.id;
        item.timelineId = item.id;
        item.temperatureId = 2;
      });
      in50degree.forEach(async (item) => {
        item.productId = product.id;
        item.timelineId = item.id;
        item.temperatureId = 3;
      });
      data = [...in30degree, ...in40degree, ...in50degree];
      data = data.map((item) => {
        return {
          productId: item.productId,
          timelineId: item.timelineId,
          temperatureId: item.temperatureId,
        };
      });

      const scheduleFound = await Schedule.findAll({
        where: {
          productId: id,
        },
      });

      if (scheduleFound.length < data.length) {
        const dataToCreate = data.filter((item) => {
          return !scheduleFound.find(
            (schedule) =>
              schedule.productId === item.productId &&
              schedule.timelineId === item.timelineId &&
              schedule.temperatureId === item.temperatureId
          );
        });
        await Schedule.bulkCreate(dataToCreate);
      } else {
        const dataToUpdate = scheduleFound.filter((item) => {
          return !data.find(
            (schedule) =>
              schedule.productId === item.productId &&
              schedule.timelineId === item.timelineId &&
              schedule.temperatureId === item.temperatureId
          );
        });
        dataToUpdate.forEach(async (item) => {
          await item.destroy();
        });
      }

      res.json({
        message: `Product  has been updated`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  showBySlug: async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: {
          slug,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!product) {
        return res.json({
          message: `Product with slug ${slug} is not found`,
        });
      }
      res.json(product);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.json({
          message: `Product  is not found`,
        });
      }
      const scheduleFound = await Schedule.findAll({
        where: {
          productId: id,
        },
      });
      if (scheduleFound.length > 0) {
        scheduleFound.forEach(async (item) => {
          await item.destroy();
        });
      }
      await product.destroy();
      res.json({
        message: `Product has been deleted`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
