"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TransactionDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
        unique: true,
      },
      transactionId: {
        type: Sequelize.BIGINT,
        references: {
          model: "transactionDataStabilities",
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
      value: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM("Passed", "Failed", "Not Checked"),
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
    await queryInterface.dropTable("TransactionDetails");
  },
};
