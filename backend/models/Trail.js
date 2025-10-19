const { DataTypes } = require('sequelize');
const sequelize = require('./index');

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
  distance_km: DataTypes.FLOAT,
  geojson: DataTypes.JSONB
});

module.exports = Trail;
