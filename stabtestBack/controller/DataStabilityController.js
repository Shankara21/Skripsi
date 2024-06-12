const {
  Section,
  Line,
  Product,
  ProductDescription,
  DataStability,
  Variant,
  Schedule,
  Timeline,
  Temperature,
  Event,
  TransactionDataStability,
  TransactionDetails,
} = require("../models");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  index: async (req, res) => {
    try {
      const dataStabilities = await DataStability.findAll({
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
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Variant,
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
          },
          {
            model: Line,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(dataStabilities);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  store: async (req, res) => {
    try {
      const {
        productDescId,
        lineId,
        sectionId,
        description,
        pic,
        lotNumber,
        date,
        status,
      } = req.body;
      const productDescFound = await ProductDescription.findByPk(
        productDescId,
        {
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
        }
      );
      const schedule = await Schedule.findAll({
        where: {
          productId: productDescFound.productId,
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
        ],
      });
      const targetDate = [];

      const dataStability = await DataStability.create({
        productDescId,
        productId: productDescFound.productId,
        lineId,
        sectionId,
        description,
        pic,
        lotNumber,
        date,
        status,
      });

      schedule.forEach((element) => {
        let number, unit, resDate;
        if (element.Timeline.time == "initial") {
          resDate = moment(date).format("YYYY-MM-DD");
          targetDate.push({
            date: resDate,
            scheduleId: element.id,
            description: `${productDescFound.Variant.name} / ${element.Timeline.time} ${element.Temperature.value} / ${description}`,
          });
        } else {
          // Ganti spasi dengan -
          let time = element.Timeline.time.replace(/\s/g, "-");
          // number diambil dari time sebelum -
          number = time.substring(0, time.indexOf("-"));
          // unit diambil dari time setelah -
          unit = time.substring(time.indexOf("-") + 1);
          resDate = moment(date).add(number, `${unit}`).format("YYYY-MM-DD");
          targetDate.push({
            date: resDate,
            scheduleId: element.id,
            description: `${productDescFound.Variant.name} / ${element.Timeline.time} ${element.Temperature.value} / ${description}`,
          });
        }
      });

      Event.bulkCreate(
        targetDate.map((item) => ({
          ...item,
          dataStabilityId: dataStability.id,
        }))
      );

      res.json({
        message: "Data stability created successfully",
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
      const dataStability = await DataStability.findAll({
        where: {
          productId: product.id,
        },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Variant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Line,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(dataStability);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const dataStability = await DataStability.findByPk(id, {
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
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Variant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Line,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(dataStability);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        productDescId,
        lineId,
        sectionId,
        description,
        pic,
        lotNumber,
        date,
        status,
      } = req.body;
      const dataStabilityFound = await DataStability.findByPk(id);

      if (dataStabilityFound.date != date) {
        const events = await Event.findAll({
          where: {
            dataStabilityId: dataStabilityFound.id,
          }
        })
        const productDescFound = await ProductDescription.findByPk(
          productDescId,
          {
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
          }
        );
        
        for (const event of events) {
          const schedule = await Schedule.findByPk(event.scheduleId, {
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
            ],
          });
          let number, unit, resDate;
          if (schedule.Timeline.time == "initial") {
            resDate = moment(date).format("YYYY-MM-DD");
            await event.update({
              date: resDate,
              description: `${productDescFound.Variant.name} / ${schedule.Timeline.time} ${schedule.Temperature.value} / ${description}`,
            });
          } else {
            let time = schedule.Timeline.time.replace(/\s/g, "-");
            number = time.substring(0, time.indexOf("-"));
            unit = time.substring(time.indexOf("-") + 1);
            resDate = moment(date)
              .add(number, `${unit}`)
              .format("YYYY-MM-DD");
            await event.update({
              date: resDate,
              description: `${productDescFound.Variant.name} / ${schedule.Timeline.time} ${schedule.Temperature.value} / ${description}`,
            });
          }
        }

        await dataStabilityFound.update({
          date,
        });
      } else {
        await dataStabilityFound.update({
          productDescId,
          lineId,
          sectionId,
          description,
          pic,
          lotNumber,
          date,
          status,
        });
      }

      return res.json({
        message: "Data stability updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const dataStability = await DataStability.findByPk(id);

      if (!dataStability) {
        return res.status(404).json({ message: "Data stability not found" });
      }

      const transactionDataStability = await TransactionDataStability.findAll({
        where: {
          dataStabilityId: dataStability.id,
        },
      });

      for (const transaction of transactionDataStability) {
        const transactionDetails = await TransactionDetails.findAll({
          where: {
            transactionId: transaction.id,
          },
        });
        for (const detail of transactionDetails) {
          await detail.destroy();
        }

        if (transaction.attachmentSensory) {
          if (fs.existsSync(`public/${transaction.attachmentSensory}`)) {
            fs.unlinkSync(`public/${transaction.attachmentSensory}`);
          }
        }

        if (transaction.attachmentAnalysis) {
          if (fs.existsSync(`public/${transaction.attachmentAnalysis}`)) {
            fs.unlinkSync(`public/${transaction.attachmentAnalysis}`);
          }
        }

        await transaction.destroy();
      }

      const events = await Event.findAll({
        where: {
          dataStabilityId: dataStability.id,
        },
      });

      for (const event of events) {
        await event.destroy();
      }

      await dataStability.destroy();

      res.json({ message: "Data stability deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  countBySection: async (req, res) => {
    try {
      const dataStabilities = await DataStability.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Section,
          },
        ],
      });
      const result = [];
      dataStabilities.forEach((dataStability) => {
        const section = dataStability.Section.code;
        const found = result.find((item) => item.section === section);
        if (!found) {
          result.push({
            section,
            amount: 1,
          });
        } else {
          found.amount++;
        }
      });
      return res.json({
        result,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Something went wrong",
      });
    }
  },
  countByStatus: async (req, res) => {
    try {
      // count by status Done, On Progress, Canceled
      const dataStabilities = await DataStability.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      let Done = 0;
      let OnProgress = 0;
      let Canceled = 0;
      dataStabilities.forEach((dataStability) => {
        if (dataStability.status === "Done") {
          Done++;
        } else if (dataStability.status === "On Progress") {
          OnProgress++;
        } else if (dataStability.status === "Canceled") {
          Canceled++;
        }
      });
      let data = [
        { status: "Done", amount: Done },
        { status: "On Progress", amount: OnProgress },
        { status: "Canceled", amount: Canceled },
      ];
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Something went wrong",
      });
    }
  },
  countByYear: async (req, res) => {
    try {
      const dataStabilities = await DataStability.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      let year = [];
      dataStabilities.forEach((dataStability) => {
        const date = dataStability.date;
        const found = year.find(
          (item) => item.year === moment(date).format("YYYY")
        );
        if (!found) {
          year.push({
            year: moment(date).format("YYYY"),
            amount: 1,
          });
        } else {
          found.amount++;
        }
      });
      return res.json(year);
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Something went wrong",
      });
    }
  },
  getByProductDesc: async (req, res) => { 
    try {
      const { id } = req.params;
      const dataStability = await DataStability.findAll({
        where: {
          productDescId: id,
        },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Variant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Line,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(dataStability);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },

  getByLotNumber: async (req, res) => { 
    try {
      const { lotNumber, slug } = req.params;
      const product = await Product.findOne({
        where: {
          slug,
        }
      })
      const dataStability = await DataStability.findAll({
        where: {
          productId: product.id,
          lotNumber: lotNumber,
        },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: ProductDescription,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Variant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Line,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(dataStability);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
};
