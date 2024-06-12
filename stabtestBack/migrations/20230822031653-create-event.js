"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
        unique: true,
      },
      dataStabilityId: {
        type: Sequelize.BIGINT,
        references: {
          model: "dataStabilities",
          key: "id",
        },
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstSchedules",
          key: "id",
        },
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("Done", "Not Yet"),
        defaultValue: "Not Yet",
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
    await queryInterface.dropTable("events");
  },
};
