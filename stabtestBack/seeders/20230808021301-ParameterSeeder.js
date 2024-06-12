"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mstParameters", [
      {
        name: "Brix (%)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Acidity (%)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Natrium (%)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "pH",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Visual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Filling Volume (mL)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Internal Pressure (Mpa)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Capping Angle (°)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "1st Torque (Nm)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "2nd Torque (Nm)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bridge Break Angle (°)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leak Angle (°)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "L-B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sensory Visual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sensory Flavor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sensory Mouthfeel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sensory Taste",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sensory After Taste",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Total Bakteri (cfu/mL)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jamur / Kapang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Escherichia Coli (/100mL)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Salmonella sp  (/100mL)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "P. Aerugenosa  (/100mL)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TAB (cfu/mL)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Moisture Content (%)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Water Activity (AW)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Residual O2 (%)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Acid Value (mg KOH/g)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Peroxide Value (mEq O2/kg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Total Energy (kkal)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Energy from Fat (kkal)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Total Fat (g)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Saturated Fat (g)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cholesterol (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Protein (g)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Total Carbohydrate (g)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dietary Fiber (g)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Total Sugar (g)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Natrium (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kalium (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin A (microgram)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin E (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Calcium (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Magnesium (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Isoflavones",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin B1 (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin B2 (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin B6 (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin B12 (microgram)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Niacin B3 (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pantothenic Acid B5 (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Folic Acid B9 (microgram)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin C (mg)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitamin D (microgram)",
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
