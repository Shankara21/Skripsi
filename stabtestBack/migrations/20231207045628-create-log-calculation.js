"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("logCalculations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      dataStabilityId: {
        type: Sequelize.BIGINT,
        references: {
          model: "dataStabilities",
          key: "id",
        },
      },
      parameterId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstParameters",
          key: "id",
        },
      },
      res30: {
        type: Sequelize.INTEGER,
      },
      res40: {
        type: Sequelize.INTEGER,
      },
      res50: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("logCalculations");
  },
};
