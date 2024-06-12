"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstTimelines", [
      {
        time: "initial",
        value: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "1 weeks",
        value: 0.25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "2 weeks",
        value: 0.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "1 month",
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "2 month",
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "3 month",
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "4 month",
        value: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "5 month",
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "6 month",
        value: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "7 month",
        value: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "8 month",
        value: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "9 month",
        value: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "10 month",
        value: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "11 month",
        value: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "12 month",
        value: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "13 month",
        value: 13,  
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
