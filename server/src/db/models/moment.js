'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Moment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Moment.belongsToMany(models.user, { through: 'userMoments' });
      Moment.belongsTo(models.video, { targetKey: 'id', foreignKey: 'videoId' });
      Moment.belongsTo(models.channel, { targetKey: 'id', foreignKey: 'channelId' });
    }
  };

  Moment.init({
    startTime: DataTypes.FLOAT,
    stopTime: DataTypes.FLOAT,
    videoId: DataTypes.INTEGER,
    channelId: DataTypes.INTEGER,
    createdByUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'moment',
    tableName: 'moments'
  });

  return Moment;
};