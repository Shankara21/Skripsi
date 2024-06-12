"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstSections", [
      {
        code: "PJD",
        name: "Project Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "PSD",
        name: "Process Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "RMD",
        name: "Raw Material Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "PMD",
        name: "Packaging Material Development",
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
