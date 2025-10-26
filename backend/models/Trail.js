const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trail = sequelize.define('Trail', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  distance_km: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  center: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  geojson:  {
    type: DataTypes.JSONB,
    allowNull: true
  }
});

module.exports = Trail;
