"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Employees",
      [
        {
          userId: 22040001,
          name: "Herni",
          email: "herni@gmail.com",
          mobile: "+6282196793724",
          birthdate: "09/May/1992",
          address: ["Jakarta"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 22040002,
          name: "Fiah",
          email: "fiahrni@gmail.com",
          mobile: "+6282196793724",
          birthdate: "09/May/1992",
          address: ["Makassar"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 22040003,
          name: "Nurfiahidris",
          email: "fiahrni@gmail.com",
          mobile: "+6282196793724",
          birthdate: "09/May/1992",
          address: ["Makassar"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
