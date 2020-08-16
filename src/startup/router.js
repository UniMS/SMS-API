const student = require("../routes/student");
const grading = require("../routes/grading");
const statistic = require("../routes/statistic");

module.exports = function (app) {
  app.use("/api/students", student);
  app.use("/api/gradings", grading);
  app.use("/api/statistics", statistic);

  app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "fail",
      message: "Undefined route!",
    });
  });
};
