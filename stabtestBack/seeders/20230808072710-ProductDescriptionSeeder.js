'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstProductDescriptions", [
      // TODO SOYJOY
      {
        productId: 1,
        variantId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        variantId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        variantId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        variantId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        variantId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        variantId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        variantId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // TODO POCARI SWEAT
      {
        productId: 2,
        variantId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        variantId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        variantId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // TODO ION WATER
      {
        productId: 3,
        variantId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        variantId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // TODO CM
      {
        productId: 4,
        variantId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        variantId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        variantId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
