'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Video.belongsTo(models.channel, { targetKey: 'id', foreignKey: 'channelId' });
      Video.hasMany(models.moment, { onDelete: 'cascade', hooks: true });
    }
  };

  Video.init({
    url: DataTypes.STRING,
    channelId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    platform: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'video',
    tableName: 'videos'
  });

  return Video;
};