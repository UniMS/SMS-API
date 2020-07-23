const role = require("../routes/role");

module.exports = function (app) {
  app.use("/api/roles", role);
  app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "fail",
      message: "Undefined route!",
    });
  });
};
