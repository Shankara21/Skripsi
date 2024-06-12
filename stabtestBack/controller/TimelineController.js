const { Timeline } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const timelines = await Timeline.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(timelines);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const timeline = await Timeline.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!timeline) {
        return res.json({
          message: `Timeline  is not found`,
        });
      }
      res.json(timeline);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
