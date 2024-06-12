"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstVariants", [
      {
        name: "Almond & Chocolate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Raisin Almond",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Strawberry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Danish Cheese",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mocachoco Cashew",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tropical Cranberries",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lekker & Nuts",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chocolate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vanilla",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cheese",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "350mL",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "500mL",
        createdAt: new Date(),
        updatedAt: new Date(),  
      },
      {
        name: "900mL",
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
