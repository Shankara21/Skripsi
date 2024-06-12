const { LogCalculation, DataStability, Parameter } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const logCalculations = await LogCalculation.findAll({
        where: { dataStabilityId: req.params.dataStabilityId },
        include: [DataStability, Parameter],
      });
      res.status(200).json(logCalculations);
    } catch (error) {
      console.log(error);
    }
  },
  show: async (req, res) => {
    try {
      const logCalculations = await LogCalculation.findAll({
        where: {
          parameterId: req.params.parameterId,
          dataStabilityId: req.params.dataStabilityId,
        },
        include: [DataStability, Parameter],
      });
      res.status(200).json(logCalculations);
    } catch (error) {
      console.log(error);
    }
  },
  store: async (req, res) => {
    try {
      const logCalculationFound = await LogCalculation.findOne({
        where: {
          dataStabilityId: req.body.dataStabilityId,
          parameterId: req.body.parameterId,
        },
      });
      if (logCalculationFound) {
        res.json({ message: "Data already exist" });
      } else {
        const logCalculation = await LogCalculation.create(req.body);
        res.status(200).json(logCalculation);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
