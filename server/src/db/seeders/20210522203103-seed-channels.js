'use strict';
const { channels } = require('../migration-data/initialSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('channels', channels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('channels', null, {});
  }
};
