"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstTemperatures", [
      {
        value: "30°C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "40°C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "50°C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
