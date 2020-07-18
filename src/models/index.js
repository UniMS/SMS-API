"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const db = {};

let sequelize;
sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

module.exports = db;
