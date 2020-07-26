const role = require("../routes/role");
const student = require("../routes/student");
const examResult = require("../routes/examResult");

module.exports = function (app) {
  app.use("/api/roles", role);
  app.use("/api/students", student);
  app.use("/api/exam-results", examResult);

  app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "fail",
      message: "Undefined route!",
    });
  });
};
