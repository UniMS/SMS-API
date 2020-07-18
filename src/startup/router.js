const academicYear = require("../routes/academicYear");

module.exports = function (app) {
  app.use("/api/v1/academicYears", academicYear);
  app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "fail",
      message: "Undefined route!",
    });
  });
};
