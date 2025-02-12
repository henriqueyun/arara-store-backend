require('dotenv/config');

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'arara-store',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'arara-store',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {},
    },
  },
};
