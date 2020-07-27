const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");

exports.findAll = catchAsync(async (req, res) => {
  const roles = await models.Role.findAll();

  const users = await models.User.findAll({ include: models.Role });

  return res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
