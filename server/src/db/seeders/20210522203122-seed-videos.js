'use strict';
const { videos } = require('../migration-data/initialSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('videos', videos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('videos', null, {});
  }
};
