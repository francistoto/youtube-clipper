'use strict';
const { likes } = require('../migration-data/initialSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('likes', likes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('likes', null, {});
  }
};
