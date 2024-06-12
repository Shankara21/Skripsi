"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mstSchedules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstProducts",
          key: "id",
        },
      },
      timelineId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstTimelines",
          key: "id",
        },
      },
      temperatureId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstTemperatures",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("mstSchedules");
  },
};
