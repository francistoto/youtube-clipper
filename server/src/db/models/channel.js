'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Channel.belongsTo(models.user, { targetKey: 'id', foreignKey: 'userId' });
      Channel.hasMany(models.video);
      Channel.hasMany(models.moment)
    }
  };
  
  Channel.init({
    name: DataTypes.STRING,
    background: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'channel',
    tableName: 'channels'
  });

  return Channel;
};