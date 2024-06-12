const { Op, where } = require("sequelize");
const {
  TransactionDataStability,
  DataStability,
  ProductDescParamsStd,
  TransactionDetails,
  Event,
  Schedule,
  Temperature,
  Timeline,
  Parameter,
  ProductDescription,
} = require("../models");
const fs = require("fs");

module.exports = {
  index: async (req, res) => {
    try {
      const transactionDataStability = await TransactionDataStability.findAll();
      res.status(200).json(transactionDataStability);
    } catch (error) {
      console.log(error);
    }
  },
  store: async (req, res) => {
    try {
      let attachmentSensory, attachmentAnalysis;
      const { dataStabilityId, eventId } = req.body;

      if (req.files) {
        if (req.files.attachmentSensory) {
          attachmentSensory = `/uploads/${req.files.attachmentSensory[0].filename}`;
        }
        if (req.files.attachmentAnalysis) {
          attachmentAnalysis = `/uploads/${req.files.attachmentAnalysis[0].filename}`;
        }
      }

      // Find event by eventId
      const findEvent = await Event.findByPk(eventId, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Schedule,
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
            ],
          },
        ],
      });

      let data = [];
      // data berisi semua req.body kecuali dataStabilityId dan eventId

      const dataStability = await DataStability.findByPk(dataStabilityId);

      const productDescParamsStds = await ProductDescParamsStd.findAll({
        where: {
          productDescId: dataStability.productDescId,
        },
      });

      // filter dataStabilityId dan eventId
      for (const key in req.body) {
        if (key !== "dataStabilityId" && key !== "eventId") {
          data.push({
            parameterId: parseInt(key),
            value: req.body[key],
          });
        }
      }

      // adding standard and standardType to data
      data.forEach(async (item) => {
        productDescParamsStds.filter((productDescParamsStd) => {
          if (productDescParamsStd.parameterId === item.parameterId) {
            item.standard = productDescParamsStd.standard;
            item.standardType = productDescParamsStd.standardType;
          }
        });
      });

      // filtering value is Standard or Not
      data.forEach(async (item) => {
        if (item.value != "") {
          if (item.standardType == "range") {
            let min, max, value;
            min = item.standard.substring(0, item.standard.indexOf("-"));
            max = item.standard.substring(item.standard.indexOf("-") + 1);
            min = parseFloat(min, 2);
            max = parseFloat(max, 2);
            value = parseFloat(item.value, 2);
            if (value >= min && value <= max) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (item.standardType == "gte") {
            let standard = parseFloat(item.standard);
            value = parseFloat(item.value, 2);
            if (value >= standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (item.standardType == "lte") {
            let standard = parseFloat(item.standard);
            value = parseFloat(item.value, 2);
            if (value <= standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (item.standardType == "gt") {
            let standard = parseFloat(item.standard);
            value = parseFloat(item.value, 2);
            if (value > standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (item.standardType == "lt") {
            let standard = parseFloat(item.standard);
            value = parseFloat(item.value, 2);
            if (value < standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          }
        } else {
          item.status = "Not Checked";
        }
      });

      // Variable isInitial to check timelineId
      let isInitial = findEvent.Schedule.timelineId;

      // List event by dataStabilityId
      const listEventByDataStability = await Event.findAll({
        where: {
          dataStabilityId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Schedule,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      // Variable to filter listEventByDataStability
      let listEventInitial = [];

      if (isInitial == 1) {
        // Filtering listEventByDataStability
        listEventByDataStability.filter((item) => {
          if (item.Schedule.timelineId == 1) {
            listEventInitial.push({
              dataStabilityId: item.dataStabilityId,
              eventId: item.id,
              attachmentAnalysis,
              attachmentSensory,
            });
          }
        });

        listEventInitial.forEach(async (item) => {
          const transaction = await TransactionDataStability.create({
            dataStabilityId: item.dataStabilityId,
            eventId: item.eventId,
            attachmentSensory: item.attachmentSensory,
            attachmentAnalysis: item.attachmentAnalysis,
          });

          // update status event
          const findEvent = await Event.findByPk(item.eventId);
          findEvent.status = "Done";
          await findEvent.save();

          // sisakan parameterId, value, status
          data = data.map((item) => {
            return {
              transactionId: transaction.id,
              parameterId: item.parameterId,
              value: item.value,
              status: item.status,
            };
          });

          // bulkCreate transactionDetails
          await TransactionDetails.bulkCreate(data);
        });
      } else {
        const transaction = await TransactionDataStability.create({
          dataStabilityId,
          eventId,
          attachmentSensory,
          attachmentAnalysis,
        });

        // update status event
        findEvent.status = "Done";
        await findEvent.save();

        // sisakan parameterId, value, status
        data = data.map((item) => {
          return {
            transactionId: transaction.id,
            parameterId: item.parameterId,
            value: item.value,
            status: item.status,
          };
        });

        // bulkCreate transactionDetails
        await TransactionDetails.bulkCreate(data);
      }

      res.status(200).json({
        message: "Transaction Data Stability created successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
  getByDataStabilityId: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionDataStability = await TransactionDataStability.findAll({
        where: {
          dataStabilityId: id,
        },
        include: [
          {
            model: Event,
            include: [
              {
                model: Schedule,
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
              },
            ],
          },
          {
            model: TransactionDetails,
            include: [
              {
                model: Parameter,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      });
      res.status(200).json(transactionDataStability);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getTransactionDetailsByTransactionId: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionDetails = await TransactionDetails.findAll({
        where: {
          transactionId: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Parameter,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: TransactionDataStability,
            include: [
              {
                model: Event,
                include: [
                  {
                    model: Schedule,
                    include: [
                      {
                        model: Timeline,
                      },
                      {
                        model: Temperature,
                      },
                    ],
                  },
                ],
              },
              {
                model: DataStability,
              },
            ],
          },
        ],
      });

      const promises = transactionDetails.map(async (item) => {
        const findData = await ProductDescParamsStd.findOne({
          where: {
            productDescId:
              item.TransactionDataStability.DataStability.productDescId,
            parameterId: item.parameterId,
          },
        });
        item.dataValues.standard = findData.standard;
        item.dataValues.standardType = findData.standardType;
      });

      await Promise.all(promises);

      res.status(200).json(transactionDetails);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  showTransactionDataStability: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionDataStability = await TransactionDataStability.findByPk(
        id,
        {
          include: [
            {
              model: Event,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              include: [
                {
                  model: Schedule,
                  include: [
                    {
                      model: Timeline,
                    },
                    {
                      model: Temperature,
                    },
                  ],
                },
              ],
            },
          ],
        }
      );
      res.status(200).json(transactionDataStability);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  updateTransactionDataStability: async (req, res) => {
    try {
      const { id } = req.params;
      const findData = await TransactionDataStability.findByPk(id);
      const { dataStabilityId, eventId } = req.body;
      let attachmentSensory, attachmentAnalysis;
      if (req.files) {
        if (req.files.attachmentSensory) {
          attachmentSensory = `/uploads/${req.files.attachmentSensory[0].filename}`;
          if (findData.attachmentSensory) {
            if (fs.existsSync(`./public${findData.attachmentSensory}`)) {
              fs.unlinkSync(`./public${findData.attachmentSensory}`);
            }
          }
        }
        if (req.files.attachmentAnalysis) {
          attachmentAnalysis = `/uploads/${req.files.attachmentAnalysis[0].filename}`;
          if (findData.attachmentAnalysis) {
            if (fs.existsSync(`./public${findData.attachmentAnalysis}`)) {
              fs.unlinkSync(`./public${findData.attachmentAnalysis}`);
            }
          }
        }
      }
      findData.dataStabilityId = dataStabilityId;
      findData.eventId = eventId;
      findData.attachmentSensory = attachmentSensory;
      findData.attachmentAnalysis = attachmentAnalysis;
      await findData.save();
      res.status(200).json({
        message: "Transaction Data Stability updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionDataStability = await TransactionDataStability.findByPk(
        id
      );
      const transactionDetails = await TransactionDetails.findAll({
        where: {
          transactionId: id,
        },
      });
      const event = await Event.findByPk(transactionDataStability.eventId);
      transactionDetails.forEach(async (item) => {
        await item.destroy();
      });
      event.status = "Not Yet";
      await event.save();

      const filterAttachment = await TransactionDataStability.findAll({
        where: {
          dataStabilityId: transactionDataStability.dataStabilityId,
          attachmentSensory: transactionDataStability.attachmentSensory,
          attachmentAnalysis: transactionDataStability.attachmentAnalysis,
          id: {
            [Op.not]: id,
          },
        },
      });
      filterAttachment.forEach(async (item) => {
        item.attachmentSensory = null;
        item.attachmentAnalysis = null;
        await item.save();
      });

      if (transactionDataStability.attachmentSensory) {
        if (
          fs.existsSync(`./public${transactionDataStability.attachmentSensory}`)
        ) {
          fs.unlinkSync(
            `./public${transactionDataStability.attachmentSensory}`
          );
        }
      }
      if (transactionDataStability.attachmentAnalysis) {
        if (
          fs.existsSync(
            `./public${transactionDataStability.attachmentAnalysis}`
          )
        ) {
          fs.unlinkSync(
            `./public${transactionDataStability.attachmentAnalysis}`
          );
        }
      }
      await transactionDataStability.destroy();

      res.status(200).json({
        message: "Transaction Data Stability deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  showTransactionDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionDataStability = await TransactionDetails.findByPk(id, {
        include: [
          {
            model: TransactionDataStability,
          },
          {
            model: Parameter,
          },
        ],
      });
      res.status(200).json(transactionDataStability);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  updateTransactionDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const findData = await TransactionDetails.findByPk(id, {
        include: [
          {
            model: TransactionDataStability,
            include: [
              {
                model: DataStability,
              },
              {
                model: Event,
                include: [
                  {
                    model: Schedule,
                  },
                ],
              },
            ],
          },
          {
            model: Parameter,
          },
        ],
      });
      if (findData.TransactionDataStability.Event.Schedule.timelineId == 1) {
        let findAllTimeline1 = await TransactionDetails.findAll({
          where: {
            parameterId: findData.parameterId,
          },
          include: [
            {
              model: TransactionDataStability,
              include: [
                {
                  model: Event,
                  include: [
                    {
                      model: Schedule,
                    },
                  ],
                },
                {
                  model: DataStability,
                },
              ],
            },
          ],
        });

        findAllTimeline1 = findAllTimeline1.filter((item) => {
          return (
            item.TransactionDataStability.Event.Schedule.timelineId == 1 &&
            item.TransactionDataStability.dataStabilityId ==
              findData.TransactionDataStability.dataStabilityId
          );
        });

        const filterDataStabilityId = findAllTimeline1.filter((item) => {
          return (
            item.TransactionDataStability.dataStabilityId ==
            findData.TransactionDataStability.dataStabilityId
          );
        });
        const filteredData = filterDataStabilityId.filter((item) => {
          return item.TransactionDataStability.Event.Schedule.timelineId == 1;
        });
        filteredData.forEach(async (item) => {
          const productDescParamsStds = await ProductDescParamsStd.findOne({
            where: {
              productDescId:
                item.TransactionDataStability.DataStability.productDescId,
              parameterId: item.parameterId,
            },
          });
          if (productDescParamsStds.standardType == "range") {
            let min, max, value;
            min = productDescParamsStds.standard.substring(
              0,
              productDescParamsStds.standard.indexOf("-")
            );
            max = productDescParamsStds.standard.substring(
              productDescParamsStds.standard.indexOf("-") + 1
            );
            min = parseFloat(min, 2);
            max = parseFloat(max, 2);
            value = parseFloat(req.body.value, 2);
            if (value >= min && value <= max) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (productDescParamsStds.standardType == "gte") {
            let standard = parseFloat(productDescParamsStds.standard);
            value = parseFloat(req.body.value, 2);
            if (value >= standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (productDescParamsStds.standardType == "lte") {
            let standard = parseFloat(productDescParamsStds.standard);
            value = parseFloat(req.body.value, 2);
            if (value <= standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (productDescParamsStds.standardType == "gt") {
            let standard = parseFloat(productDescParamsStds.standard);
            value = parseFloat(req.body.value, 2);
            if (value > standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          } else if (productDescParamsStds.standardType == "lt") {
            let standard = parseFloat(productDescParamsStds.standard);
            value = parseFloat(req.body.value, 2);
            if (value < standard) {
              item.status = "Passed";
            } else {
              item.status = "Failed";
            }
          }
          item.value = req.body.value;
          await item.save();
        });
      } else {
        const productDescParamsStds = await ProductDescParamsStd.findOne({
          where: {
            productDescId:
              findData.TransactionDataStability.DataStability.productDescId,
            parameterId: findData.parameterId,
          },
        });
        if (productDescParamsStds.standardType == "range") {
          let min, max, value;
          min = productDescParamsStds.standard.substring(
            0,
            productDescParamsStds.standard.indexOf("-")
          );
          max = productDescParamsStds.standard.substring(
            productDescParamsStds.standard.indexOf("-") + 1
          );
          min = parseFloat(min, 2);
          max = parseFloat(max, 2);
          value = parseFloat(req.body.value, 2);
          if (value >= min && value <= max) {
            findData.status = "Passed";
          } else {
            findData.status = "Failed";
          }
        } else if (productDescParamsStds.standardType == "gte") {
          let standard = parseFloat(productDescParamsStds.standard);
          value = parseFloat(req.body.value, 2);
          if (value >= standard) {
            findData.status = "Passed";
          } else {
            findData.status = "Failed";
          }
        } else if (productDescParamsStds.standardType == "lte") {
          let standard = parseFloat(productDescParamsStds.standard);
          value = parseFloat(req.body.value, 2);
          if (value <= standard) {
            findData.status = "Passed";
          } else {
            findData.status = "Failed";
          }
        } else if (productDescParamsStds.standardType == "gt") {
          let standard = parseFloat(productDescParamsStds.standard);
          value = parseFloat(req.body.value, 2);
          if (value > standard) {
            findData.status = "Passed";
          } else {
            findData.status = "Failed";
          }
        } else if (productDescParamsStds.standardType == "lt") {
          let standard = parseFloat(productDescParamsStds.standard);
          value = parseFloat(req.body.value, 2);
          if (value < standard) {
            findData.status = "Passed";
          } else {
            findData.status = "Failed";
          }
        }
        findData.value = req.body.value;
        await findData.save();
      }

      return res.status(200).json({
        message: "Data updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  getDataFromTransactionDetailsByTransactionId: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionDetails = await TransactionDetails.findAll({
        where: {
          transactionId: id,
        },
      });
      return res.status(200).json(transactionDetails);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },

  getTrendParameter: async (req, res) => {
    try {
      const { dataStabilityId, maxTime } = req.params;
      const { parameter } = req.query;

      const transactionFound = await TransactionDetails.findAll({
        include: [
          {
            model: TransactionDataStability,
            where: {
              dataStabilityId,
            },
            include: [
              {
                model: Event,
                include: [
                  {
                    model: Schedule,
                    include: [
                      {
                        model: Timeline,
                        // where: {
                        //   value: {
                        //     [Op.lte]: 3,
                        //   }
                        // }
                      },
                      {
                        model: Temperature,
                      },
                    ],
                  },
                ],
              },
              {
                model: DataStability,
                include: [
                  {
                    model: ProductDescription,
                  },
                ],
              },
            ],
          },
          {
            model: Parameter,
            where: {
              id: {
                [Op.in]: parameter.split(",").map((item) => parseInt(item)),
              },
            },
          },
        ],
      });

      const parameterFound = await Parameter.findAll({
        where: {
          id: {
            [Op.in]: parameter.split(",").map((item) => parseInt(item)),
          },
        },
      });
      const productDescId =
        transactionFound[0].TransactionDataStability.DataStability
          .productDescId;
      const parameterValue = await ProductDescParamsStd.findAll({
        where: {
          productDescId,
          parameterId: {
            [Op.in]: parameter.split(",").map((item) => parseInt(item)),
          },
        },
      });

      const parameterName = parameterFound.map((item) => {
        return item.name;
      });
      const parameterNameMap = Object.fromEntries(
        parameterFound.map((item) => [item.id, item.name])
      );

      // Map through parameterValue and add the parameterName
      const output = parameterValue.map((item) => ({
        parameterName: parameterNameMap[item.parameterId],
        standard: item.standard,
        standardType: item.standardType,
      }));


      const data = parameterFound.map((item) => {
        let filteredData = transactionFound.filter(
          (data) =>
            data.parameterId === item.id &&
            data.TransactionDataStability.Event.Schedule.Timeline.value <=
              maxTime &&
            data.TransactionDataStability.Event.Schedule.Timeline.value != 0
        );
        // cari yang Timeline.value == 0
        const findInitial = transactionFound.find((data) => {
          return (
            data.TransactionDataStability.Event.Schedule.Timeline.value == 0 &&
            data.parameterId == item.id
          );
        });

        filteredData = [findInitial, ...filteredData];
        return {
          name: item.name,
          arrValue: filteredData.map((data) => {
            return data.value;
          }),
          arrTime: filteredData.map((data) => {
            return (
              data.TransactionDataStability.Event.Schedule.Timeline.time +
              " in " +
              data.TransactionDataStability.Event.Schedule.Temperature.value
            );
          }),
          arrTimeVal: filteredData.map((data) => {
            return (
              data.TransactionDataStability.Event.Schedule.Timeline.value +
              " | " +
              data.TransactionDataStability.Event.Schedule.Temperature.value
            );
          }),
          timeTable: filteredData.map((data) => {
            return data.TransactionDataStability.Event.Schedule.Timeline
              .value == 0
              ? "Initial"
              : data.TransactionDataStability.Event.Schedule.Timeline.time.substring(
                  0,
                  data.TransactionDataStability.Event.Schedule.Timeline.time.indexOf(
                    " "
                  )
                ) +
                  data.TransactionDataStability.Event.Schedule.Timeline.time.substring(
                    3,
                    data.TransactionDataStability.Event.Schedule.Timeline.time.indexOf(
                      " "
                    )
                  ) +
                  " " +
                  data.TransactionDataStability.Event.Schedule.Temperature
                    .value;
          }),
          data: filteredData.map((data) => {
            return {
              timeline:
                data.TransactionDataStability.Event.Schedule.Timeline.time,
              temperature:
                data.TransactionDataStability.Event.Schedule.Temperature.value,
              value: data.value,
              status: data.status,
            };
          }),
        };
      });

      const arrTime = data[0].arrTime;

      function transformArray(arr) {
        return arr.map((item) => {
          const parts = item.split(" ");
          const value = parts[0];
          const unit = parts[1];
          const temperature = parts[3];

          if (value.toLowerCase() === "initial") {
            return "Initial";
          } else {
            const timeString =
              value > 1
                ? `${value}${unit.charAt(0).toUpperCase()} ${temperature}`
                : `${value}${unit.toUpperCase().charAt(0)} ${temperature}`;
            return timeString;
          }
        });
      }

      const transformData = transformArray(arrTime);

      const paramName = transformData.map((item) => {
        return item;
      });
      const arrOfData = data.map((item) => {
        return item.arrValue;
      });

      const rawData = {
        name: paramName,
        result: arrOfData,
      };

      const newFormat = data.map((item) => {
        return {
          name: output.find((param) => param.parameterName === item.name),
          value: item.arrValue,
        };
      });

      const dataTable = [];

      for (let i = 0; i < rawData.name.length; i++) {
        const time = rawData.name[i];
        const data = rawData.result.map((result) => result[i]);
        dataTable.push({
          time: time,
          data: data,
        });
      }

      return res.status(200).json({
        data,
        dataTable,
        parameter: output,
        time: transformData,
        newFormat,
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateWholeTransactionDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const findData = await TransactionDetails.findAll({
        where: {
          transactionId: id,
        },
        include: [
          {
            model: TransactionDataStability,
            include: [
              {
                model: DataStability,
              },
              {
                model: Event,
                include: [
                  {
                    model: Schedule,
                  },
                ],
              },
            ],
          },
          {
            model: Parameter,
          },
        ],
      });
      const objectData = Object.entries(data).map(([parameterId, value]) => ({
        parameterId: parseInt(parameterId),
        value,
      }));

      const filteredData = findData.map((item) => {
        const matchingObject = objectData.find(
          (object) => object.parameterId === item.parameterId
        );
        if (matchingObject) {
          return {
            id: item.id,
            transactionId: item.transactionId,
            parameterId: item.parameterId,
            timelineId: item.TransactionDataStability.Event.Schedule.timelineId,
            productDescId:
              item.TransactionDataStability.DataStability.productDescId,
            dataStabilityId: item.TransactionDataStability.dataStabilityId,
            value: item.value,
            newValue: matchingObject.value,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        } else {
          return item;
        }
      });
      const paramStd = await ProductDescParamsStd.findAll({
        where: {
          productDescId: filteredData[0].productDescId,
        },
      });

      filteredData.forEach((item) => {
        const findParamStd = paramStd.find((param) => {
          return param.parameterId == item.parameterId;
        });
        // tambahkan standard dan standardType ke item
        item.standard = findParamStd.standard;
        item.standardType = findParamStd.standardType;
      });

      // return res.json(filteredData);
      const newData = await TransactionDetails.findAll({
        include: [
          {
            model: TransactionDataStability,
            include: [
              {
                model: Event,
                include: [
                  {
                    model: Schedule,
                  },
                ],
              },
              {
                model: DataStability,
              },
            ],
          },
          {
            model: Parameter,
          },
        ],
      });

      const filteredTimeline1 = newData.filter((item) => {
        return (
          item.TransactionDataStability.Event.Schedule.timelineId == 1 &&
          item.TransactionDataStability.dataStabilityId ==
            filteredData[0].dataStabilityId
        );
      });

      const newfilter = filteredTimeline1.map((item) => {
        const matchingObject = objectData.find(
          (object) => object.parameterId === item.parameterId
        );
        if (matchingObject) {
          return {
            id: item.id,
            transactionId: item.transactionId,
            parameterId: item.parameterId,
            timelineId: item.TransactionDataStability.Event.Schedule.timelineId,
            productDescId:
              item.TransactionDataStability.DataStability.productDescId,
            dataStabilityId: item.TransactionDataStability.dataStabilityId,
            value: item.value,
            newValue: matchingObject.value,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        } else {
          return item;
        }
      });

      newfilter.forEach((item) => {
        const findParamStd = paramStd.find((param) => {
          return param.parameterId == item.parameterId;
        });
        // tambahkan standard dan standardType ke item
        item.standard = findParamStd.standard;
        item.standardType = findParamStd.standardType;
      });
      filteredData.forEach(async (item) => {
        if (item.newValue != item.value) {
          if (item.timelineId == 1) {
            newfilter.forEach(async (data) => {
              switch (data.standardType) {
                case "range":
                  let min = parseFloat(
                    data.standard.substring(0, data.standard.indexOf("-")),
                    2
                  );
                  let max = parseFloat(
                    data.standard.substring(data.standard.indexOf("-") + 1),
                    2
                  );
                  let value = parseFloat(data.newValue, 2);
                  data.status =
                    value >= min && value <= max ? "Passed" : "Failed";
                  break;
                case "gte":
                  let standardGte = parseFloat(data.standard);
                  let valueGte = parseFloat(data.newValue, 2);
                  data.status = valueGte >= standardGte ? "Passed" : "Failed";
                  break;
                case "lte":
                  let standardLte = parseFloat(data.standard);
                  let valueLte = parseFloat(data.newValue, 2);
                  data.status = valueLte <= standardLte ? "Passed" : "Failed";
                  break;
                case "gt":
                  let standardGt = parseFloat(data.standard);
                  let valueGt = parseFloat(data.newValue, 2);
                  data.status = valueGt > standardGt ? "Passed" : "Failed";
                  break;
                case "lt":
                  let standardLt = parseFloat(data.standard);
                  let valueLt = parseFloat(data.newValue, 2);
                  data.status = valueLt < standardLt ? "Passed" : "Failed";
                  break;
                default:
                  break;
              }
              await TransactionDetails.update(
                {
                  value: data.newValue,
                  status: data.status,
                },
                {
                  where: {
                    id: data.id,
                  },
                }
              );
            });
          } else {
            switch (item.standardType) {
              case "range":
                let min = parseFloat(
                  item.standard.substring(0, item.standard.indexOf("-")),
                  2
                );
                let max = parseFloat(
                  item.standard.substring(item.standard.indexOf("-") + 1),
                  2
                );
                let value = parseFloat(item.newValue, 2);
                item.status =
                  value >= min && value <= max ? "Passed" : "Failed";
                break;
              case "gte":
                let standardGte = parseFloat(item.standard);
                let valueGte = parseFloat(item.newValue, 2);
                item.status = valueGte >= standardGte ? "Passed" : "Failed";
                break;
              case "lte":
                let standardLte = parseFloat(item.standard);
                let valueLte = parseFloat(item.newValue, 2);
                item.status = valueLte <= standardLte ? "Passed" : "Failed";
                break;
              case "gt":
                let standardGt = parseFloat(item.standard);
                let valueGt = parseFloat(item.newValue, 2);
                item.status = valueGt > standardGt ? "Passed" : "Failed";
                break;
              case "lt":
                let standardLt = parseFloat(item.standard);
                let valueLt = parseFloat(item.newValue, 2);
                item.status = valueLt < standardLt ? "Passed" : "Failed";
                break;
              default:
                break;
            }

            await TransactionDetails.update(
              {
                value: item.newValue,
                status: item.status,
              },
              {
                where: {
                  id: item.id,
                },
              }
            );
          }
        }
      });

      return res.status(200).json({
        message: "Data updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  // TODO GET DATA FOR ASLT
  getTransactionDetailsPerParameter: async (req, res) => {
    try {
      const { dataStabilityId, parameterId } = req.params;

      const transactionDataStability = await TransactionDataStability.findAll({
        where: { dataStabilityId },
        include: [
          {
            model: Event,
            include: [
              {
                model: Schedule,
                include: [
                  {
                    model: Timeline,
                  },
                  {
                    model: Temperature,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (transactionDataStability.length === 0) {
        return res.status(400).json({
          message: "No Data",
        });
      }
      const rawData30Deg = [];
      const rawData40Deg = [];
      const rawData50Deg = [];

      const filterData30Deg = [];
      const filterData40Deg = [];
      const filterData50Deg = [];

      const promises = [];

      for (const item of transactionDataStability) {
        const temperatureId = item.Event.Schedule.temperatureId;

        const transactionDetails = await TransactionDetails.findAll({
          where: {
            transactionId: item.id,
            parameterId,
          },
          include: [
            {
              model: Parameter,
            },
            {
              model: TransactionDataStability,
              include: [
                {
                  model: Event,
                  include: [
                    {
                      model: Schedule,
                      include: [
                        {
                          model: Timeline,
                        },
                        {
                          model: Temperature,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });

        transactionDetails.forEach((detail) => {
          if (detail.TransactionDataStability.Event.Schedule.timelineId < 7) {
            const timelineValue =
              detail.TransactionDataStability.Event.Schedule.Timeline.value;
            const status = detail.status;
            const value = detail.value;
            if (temperatureId === 1) {
              filterData30Deg.push({ timeline: timelineValue, value, status });
            } else if (temperatureId === 2) {
              filterData40Deg.push({ timeline: timelineValue, value, status });
            } else {
              filterData50Deg.push({ timeline: timelineValue, value, status });
            }
          }
          const timelineValue =
            detail.TransactionDataStability.Event.Schedule.Timeline.value;
          const status = detail.status;
          const value = detail.value;
          if (temperatureId === 1) {
            rawData30Deg.push({ timeline: timelineValue, value, status });
          } else if (temperatureId === 2) {
            rawData40Deg.push({ timeline: timelineValue, value, status });
          } else {
            rawData50Deg.push({ timeline: timelineValue, value, status });
          }
        });

        promises.push(transactionDetails);
      }

      await Promise.all(promises);

      const response = {
        filterData30Deg,
        filterData40Deg,
        filterData50Deg,
      };
      // Extract unique timelines
      const timelines = new Set();
      for (const key in response) {
        response[key].forEach((item) => timelines.add(item.timeline));
      }

      // Create the data array
      const data = [];
      timelines.forEach((timeline) => {
        const dataPoint = { timeline: timeline };

        for (const key in response) {
          const values = response[key].filter(
            (item) => item.timeline === timeline
          );
          if (values.length > 0) {
            dataPoint[`val${key.replace("filterData", "")}`] = {
              value: values[0].value,
              status: values[0].status.toLowerCase(),
            };
          } else {
            dataPoint[`val${key.replace("filterData", "")}`] = {
              value: null,
              status: null,
            };
          }
        }

        data.push(dataPoint);
      });

      data.sort((a, b) => a.timeline - b.timeline);

      return res.status(200).json({
        dataTable: data,
        rawData30Deg,
        filterData30Deg,
        rawData40Deg,
        filterData40Deg,
        rawData50Deg,
        filterData50Deg,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
