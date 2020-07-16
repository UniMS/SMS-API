require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
)
  .authenticate()
  .then(() => {
    console.log(
      `Connection to ${process.env.DB_DATABASE} has been established successfully.`
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database -", error);
  });

module.exports = sequelize;
