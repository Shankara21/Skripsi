"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("emailUsers", [
      {
        sectionId: 1,
        name: "Muhammad Husin Fahmi",
        email: "mfahmi@aio.co.id",
        nik: "2698",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 1,
        name: "Ari Basuki",
        email: "abasuki@aio.co.id",
        nik: "1303",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 2,
        name: "Fitriandi Yuni Kuntarto",
        email: "fkuntarto@aio.co.id",
        nik: "1446",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 2,
        name: "Mohammad Erfani",
        email: "merfani@aio.co.id",
        nik: "3083",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 2,
        name: "Hendrawan Puguh Hananto",
        email: "hhananto@aio.co.id",
        nik: "1752",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 3,
        name: "Anis Wamtazul Liana",
        email: "aliana@aio.co.id",
        nik: "3371",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 3,
        name: "Anom Wiyarto",
        email: "awiyarto@aio.co.id",
        nik: "1547",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 3,
        name: "Ahmad Taufiq Ramadhan",
        email: "aramadhan@aio.co.id",
        nik: "2060",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 4,
        name: "Rahma Nila Dewi Ratunda",
        email: "rratunda@aio.co.id",
        nik: "1128",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 4,
        name: "Dyah Anggraeni",
        email: "danggraeni@aio.co.id",
        nik: "2850",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 4,
        name: "Naufal Afra Rozan",
        email: "nrozan@aio.co.id",
        nik: "3576",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionId: 4,
        name: "Victor Imerius Harefa",
        email: "vharefa@aio.co.id",
        nik: "1602",
        isAdmin: false,
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
