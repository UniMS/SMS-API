const models = require("../models");
const catchAsync = require("../middlewares/catchAsync");

const _ = require("lodash");
const majors = require("../data/majors");

exports.findAll = catchAsync(async (req, res) => {
  // const roles = await models.Role.findAll();

  // const users = await models.User.findAll({ include: models.Role });

  const attendanceYear = _.random(0, 7);
  const major = _.sample(majors).name;
  const majorId = _.findIndex(majors, { name: major });
  const repeater = _.random(0, 1) ? "R" : "";

  return res.status(200).json({
    status: "success",
    data: {
      major,
      id: majorId,
      repeater,
    },
  });
});
