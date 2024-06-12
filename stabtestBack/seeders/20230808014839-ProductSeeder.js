"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstProducts", [
      {
        code: "SOYJOY",
        name: "SOYJOY",
        slug: "soyjoy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "PS",
        name: "POCARI SWEAT",
        slug: "pocari-sweat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "PSIW",
        name: "ION WATER",
        slug: "ion-water",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "NEWPRODUCT",
        name: "NEW PRODUCT",
        slug: "new-product",
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
