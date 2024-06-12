"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mstProdDescParamsStds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      productDescId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstProductDescriptions",
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
      standard: {
        type: Sequelize.STRING,
      },
      standardType: {
        type: Sequelize.ENUM("range", "gte", "lte", "gt", "lt"),
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
    await queryInterface.dropTable("mstProdDescParamsStds");
  },
};
