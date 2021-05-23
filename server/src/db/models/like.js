'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsToMany(models.user, { through: 'userLikes' });
      Like.belongsTo(models.video, { targetKey: 'id', foreignKey: 'videoId' });
      Like.belongsTo(models.channel, { targetKey: 'id', foreignKey: 'channelId' });
    }
  };

  Like.init({
    startTime: DataTypes.INTEGER,
    stopTime: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER,
    channelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
    tableName: 'likes'
  });

  return Like;
};