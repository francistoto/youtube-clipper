'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LikesByUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  LikesByUser.init({
    userId: DataTypes.INTEGER,
    likeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LikesByUser',
    tableName: 'likes_by_user'
  });
  
  return LikesByUser;
};