require("../models")
  .sequelize.sync({ force: true })
  .then(() => console.log("Re-synced database !"))
  .catch((error) => console.error(error));
