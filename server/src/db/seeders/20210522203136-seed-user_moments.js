'use strict';
const { user_moments } = require('../migration-data/initialSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_moments', user_moments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_moments', null, {});
  }
};
