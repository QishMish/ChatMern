"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn("users", "verified", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      await queryInterface.addColumn("users", "imageURL", {
        allowNull: true,
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn("users", "location", {
        allowNull: true,
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn("users", "verified"),
      await queryInterface.removeColumn("users", "imageURL"),
      await queryInterface.removeColumn("users", "location"),
    ]);
  },
};
