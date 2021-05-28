'use strict';
const { moments } = require('../migration-data/initialSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('moments', moments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('moments', null, {});
  }
};
