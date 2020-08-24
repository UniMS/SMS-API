require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.TESTING_DB_USERNAME,
    password: process.env.TESTING_DB_PASSWORD,
    database: process.env.TESTING_DB_DATABASE,
    host: process.env.TESTING_DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    dialect: 'mysql',
  },
};
