"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactionDataStabilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
        unique: true,
      },
      eventId: {
        type: Sequelize.BIGINT,
        references: {
          model: "events",
          key: "id",
        },
      },
      dataStabilityId: {
        type: Sequelize.BIGINT,
        references: {
          model: "dataStabilities",
          key: "id",
        },
      },
      attachmentSensory: {
        type: Sequelize.STRING,
      },
      attachmentAnalysis: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("transactionDataStabilities");
  },
};
