const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const dbPassword = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize('trails_db', 'postgres', dbPassword, {
  host: host,
  dialect: 'postgres',
});

module.exports = sequelize;
