const { Sequelize } = require("sequelize");

module.exports = function () {
  new Sequelize("utycc-sms", "root", "h10W0&ld", {
    dialect: "mysql",
    host: "localhost",
  })
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(() => {
      console.error("Unable to connect to the database:", error);
    });
};
