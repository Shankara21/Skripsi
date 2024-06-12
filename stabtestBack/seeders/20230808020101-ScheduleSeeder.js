"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstSchedules", [
      //TODO SOYJOY
      //! 30°C
      {
        productId: 1,
        timelineId: 1,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 6,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 9,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 12,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 15,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 16,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //! 40°C
      {
        productId: 1,
        timelineId: 1,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 4,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 5,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 6,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 7,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //! 50°C
      {
        productId: 1,
        timelineId: 1,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 2,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        timelineId: 3,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // TODO POCARI SWEAT
      //! 30°C
      {
        productId: 2,
        timelineId: 1,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 6,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 9,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 12,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 15,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ! 40°C
      {
        productId: 2,
        timelineId: 1,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 3,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 4,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 5,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 6,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ! 50°C
      {
        productId: 2,
        timelineId: 1,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        timelineId: 2,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // TODO ION WATER
      //! 30°C
      {
        productId: 3,
        timelineId: 1,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 6,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 9,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 12,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 15,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ! 40°C
      {
        productId: 3,
        timelineId: 1,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 3,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 4,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 5,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 6,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ! 50°C
      {
        productId: 3,
        timelineId: 1,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        timelineId: 2,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // TODO CM
      //! 30°C
      {
        productId: 4,
        timelineId: 1,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 4,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 5,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 6,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 7,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 8,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 9,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 10,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 11,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 12,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 13,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 14,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 15,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 16,
        temperatureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ! 40°C
      {
        productId: 4,
        timelineId: 1,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 4,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 5,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 6,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 7,
        temperatureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ! 50°C
      {
        productId: 4,
        timelineId: 1,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 2,
        temperatureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        timelineId: 3,
        temperatureId: 3,
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
