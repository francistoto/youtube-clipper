'use strict';
const { Model } = require('sequelize');
const { User, Like } = require('./index');

module.exports = (sequelize, DataTypes) => {
  class UserLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };

  UserLikes.init({
    userId: DataTypes.INTEGER,
    likeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'userLikes',
    tableName: 'user_likes'
  });
  
  return UserLikes;
};