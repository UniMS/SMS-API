'use strict';

const config = require('../../config/config');
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const ENV = config[process.env.NODE_ENV];

let sequelize;
sequelize = new Sequelize(ENV.database, ENV.username, ENV.password, {
  dialect: 'mysql',
  host: ENV.host,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false, // omit createdAt and updatedAt
  },
});

sequelize
  .authenticate()
  .then(() => console.log(`Connected to the database.😅👌`))
  .catch((error) => {
    console.log(`Unable to connect to the database.🌚😌\n`, error);
    process.exit(1);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
