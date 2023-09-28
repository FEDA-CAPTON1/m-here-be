import { Sequelize } from 'sequelize';

const db = new Sequelize(`mysql://${process.env.DB_USER}:@${process.env.DB_HOST}/mysql`) // Example for postgres

export default db;