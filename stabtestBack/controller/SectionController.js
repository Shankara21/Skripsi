const { Section } = require('../models');

module.exports = {
  index: async (req, res) => { 
    try {
      const sections = await Section.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      res.json(sections);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
}