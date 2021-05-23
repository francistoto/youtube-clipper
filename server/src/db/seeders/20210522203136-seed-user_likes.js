'use strict';
const { user_likes } = require('../migration-data/initialSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_likes', user_likes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_likes', null, {});
  }
};
