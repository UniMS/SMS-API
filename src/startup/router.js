const academicYear = require("../routes/academicYear");
const role = require("../routes/role");

module.exports = function (app) {
  app.use("/api/v1/academicYears", academicYear);
  app.use("/api/v1/roles", role);
  app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "fail",
      message: "Undefined route!",
    });
  });
};
