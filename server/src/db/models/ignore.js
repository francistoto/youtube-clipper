'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ignore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Ignore.init({
    userId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ignore',
    tableName: 'ignores'
  });

  return Ignore;
};