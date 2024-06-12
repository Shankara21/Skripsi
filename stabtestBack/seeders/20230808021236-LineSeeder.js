"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstLines", [
      {
        name: "OC1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "OC2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "FSB",
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
