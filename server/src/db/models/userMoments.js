'use strict';
const { Model } = require('sequelize');
const { User, Like } = require('./index');

module.exports = (sequelize, DataTypes) => {
  class UserMoments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };

  UserMoments.init({
    userId: DataTypes.INTEGER,
    momentId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'userMoments',
    tableName: 'user_moments'
  });
  
  return UserMoments;
};