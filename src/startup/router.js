const role = require("../routes/role");
const student = require("../routes/student");
const examResult = require("../routes/examResult");
const grading = require("../routes/grading");
const statistic = require("../routes/statistic");

module.exports = function (app) {
  app.use("/api/roles", role);
  app.use("/api/students", student);
  app.use("/api/exam-results", examResult);
  app.use("/api/gradings", grading);
  app.use("/api/statistics", statistic);

  app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "fail",
      message: "Undefined route!",
    });
  });
};
