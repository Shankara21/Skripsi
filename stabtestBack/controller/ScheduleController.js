const { Schedule, Timeline, Temperature, Product } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const schedules = await Schedule.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Timeline,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Temperature,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(schedules);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Timeline,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Temperature,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (!schedule) {
        return res.json({
          message: `Schedule  is not found`,
        });
      }
      res.json(schedule);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  showByProductId: async (req, res) => {
    try {
      const { id } = req.params;

      const temperature = await Temperature.findAll({});
      const schedule = await Schedule.findAll({
        where: {
          productId: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Timeline,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Temperature,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      const temp30 = schedule.filter((item) => item.temperatureId === 1);
      const temp40 = schedule.filter((item) => item.temperatureId === 2);
      const temp50 = schedule.filter((item) => item.temperatureId === 3);
      if (!schedule) {
        return res.json({
          message: `Schedule  is not found`,
        });
      }
      const temp = {
        temp30,
        temp40,
        temp50,
      };
      res.json({ schedule, temp });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  showByProductandTempId: async (req, res) => {
    try {
      const { productId, tempId } = req.params;
      const schedule = await Schedule.findAll({
        where: {
          productId: productId,
          temperatureId: tempId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Timeline,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Temperature,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (!schedule) {
        return res.json({
          message: `Schedule  is not found`,
        });
      }
      res.json(schedule);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  geScheduleProduct: async (req, res) => {
    try {
      const ps = {
        schedule: [],
      };
      const psiw = {
        schedule: [],
      };
      const soyjoy = {
        schedule: [],
      };
      const newProduct = {
        schedule: [],
      };
      const schedule = await Schedule.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [
          ["temperatureId", "DESC"],
          [Timeline, "id", "ASC"],
        ],
        include: [
          {
            model: Timeline,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Temperature,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      // soyjoy
      const temp30Soyjoy = schedule.filter(
        (item) =>
          item.temperatureId === 1 &&
          item.timelineId !== 1 &&
          item.productId === 1
      ).length;
      const temp40Soyjoy = schedule.filter(
        (item) =>
          item.temperatureId === 2 &&
          item.timelineId !== 1 &&
          item.productId === 1
      ).length;
      const temp50Soyjoy = schedule.filter(
        (item) =>
          item.temperatureId === 3 &&
          item.timelineId !== 1 &&
          item.productId === 1
      ).length;
      soyjoy.temp30 = temp30Soyjoy;
      soyjoy.temp40 = temp40Soyjoy;
      soyjoy.temp50 = temp50Soyjoy;
      soyjoy.totalRow = temp30Soyjoy + temp40Soyjoy + temp50Soyjoy + 6;

      // ps
      const temp30Ps = schedule.filter(
        (item) =>
          item.temperatureId === 1 &&
          item.timelineId !== 1 &&
          item.productId === 2
      ).length;
      const temp40Ps = schedule.filter(
        (item) =>
          item.temperatureId === 2 &&
          item.timelineId !== 1 &&
          item.productId === 2
      ).length;
      const temp50Ps = schedule.filter(
        (item) =>
          item.temperatureId === 3 &&
          item.timelineId !== 1 &&
          item.productId === 2
      ).length;
      ps.temp30 = temp30Ps;
      ps.temp40 = temp40Ps;
      ps.temp50 = temp50Ps;
      ps.totalRow = temp30Ps + temp40Ps + temp50Ps + 6;

      // psiw
      const temp30Psiw = schedule.filter(
        (item) =>
          item.temperatureId === 1 &&
          item.timelineId !== 1 &&
          item.productId === 3
      ).length;
      const temp40Psiw = schedule.filter(
        (item) =>
          item.temperatureId === 2 &&
          item.timelineId !== 1 &&
          item.productId === 3
      ).length;
      const temp50Psiw = schedule.filter(
        (item) =>
          item.temperatureId === 3 &&
          item.timelineId !== 1 &&
          item.productId === 3
      ).length;
      psiw.temp30 = temp30Psiw;
      psiw.temp40 = temp40Psiw;
      psiw.temp50 = temp50Psiw;
      psiw.totalRow = temp30Psiw + temp40Psiw + temp50Psiw + 6;

      // newProduct
      const temp30NewProduct = schedule.filter(
        (item) =>
          item.temperatureId === 1 &&
          item.timelineId !== 1 &&
          item.productId === 4
      ).length;
      const temp40NewProduct = schedule.filter(
        (item) =>
          item.temperatureId === 2 &&
          item.timelineId !== 1 &&
          item.productId === 4
      ).length;
      const temp50NewProduct = schedule.filter(
        (item) =>
          item.temperatureId === 3 &&
          item.timelineId !== 1 &&
          item.productId === 4
      ).length;
      newProduct.temp30 = temp30NewProduct;
      newProduct.temp40 = temp40NewProduct;
      newProduct.temp50 = temp50NewProduct;
      newProduct.totalRow =
        temp30NewProduct + temp40NewProduct + temp50NewProduct + 6;

      schedule.map((item) => {
        if (item.productId === 1 && item.timelineId !== 1) {
          soyjoy.schedule.push({
            time: item.Timeline.time,
            value: item.Timeline.value,
            temp: item.Temperature.value,
          });
        } else if (item.productId === 2 && item.timelineId !== 1) {
          ps.schedule.push({
            time: item.Timeline.time,
            value: item.Timeline.value,
            temp: item.Temperature.value,
          });
        } else if (item.productId === 3 && item.timelineId !== 1) {
          psiw.schedule.push({
            time: item.Timeline.time,
            value: item.Timeline.value,
            temp: item.Temperature.value,
          });
        } else if (item.productId === 4 && item.timelineId !== 1) {
          newProduct.schedule.push({
            time: item.Timeline.time,
            value: item.Timeline.value,
            temp: item.Temperature.value,
          });
        }
      });
      return res.status(200).json({
        ps,
        psiw,
        soyjoy,
        newProduct,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
