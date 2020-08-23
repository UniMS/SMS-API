const _ = require('lodash');
const { User } = require('../database/models');
const { validate } = require('../database/models/user');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ status: 'fail', message: error.details[0].message });

  let user = await User.findOne({ where: { username: req.body.username } });
  if (user) return res.status(400).json('User already registered');

  user = User.build(_.pick(req.body, ['name', 'username', 'password', 'roleId']));
  await user.save();

  return res.status(200).json({ status: 'success', data: _.pick(user, ['userId', 'name', 'username']) });
});
