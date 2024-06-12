"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dataStabilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
        unique: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstProducts",
          key: "id",
        },
      },
      productDescId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstProductDescriptions",
          key: "id",
        },
      },
      lineId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstLines",
          key: "id",
        },
      },
      sectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mstSections",
          key: "id",
        },
      },
      description: {
        type: Sequelize.STRING,
      },
      pic: {
        type: Sequelize.STRING,
      },
      lotNumber: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      status: {
        type: Sequelize.ENUM("Done", "Canceled", "On Progress"),
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
    await queryInterface.dropTable("dataStabilities");
  },
};
