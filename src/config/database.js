import Sequelize from 'sequelize';
import pg from 'pg';

const dbPassword = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize('trails_db', 'postgres', dbPassword, {
  host: host,
  dialectModule: pg,
  dialect: 'postgres',
});

export default sequelize;
