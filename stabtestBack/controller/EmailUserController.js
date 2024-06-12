const { Section, EmailUser } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const emailUsers = await EmailUser.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(emailUsers);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const emailUser = await EmailUser.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(emailUser);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  store: async (req, res) => {
    try {
      const emailUser = await EmailUser.create(req.body);
      res.json(emailUser);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const emailUser = await EmailUser.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(emailUser);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const emailUser = await EmailUser.destroy({
        where: { id: req.params.id },
      });
      res.json({
        message: `User has been deleted`,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  getBySection: async (req, res) => {
    try {
      const emailUsers = await EmailUser.findAll({
        where: { sectionId: req.params.sectionId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(emailUsers);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  getAdmin: async (req, res) => {
    try {
      const emailUsers = await EmailUser.findAll({
        where: { isAdmin: true },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Section,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.json(emailUsers);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
