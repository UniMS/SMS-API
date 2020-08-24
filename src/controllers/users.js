const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../database/models');
const { validate } = require('../database/models/user');
const catchAsync = require('../utils/catchAsync');

/**
 * Register a new user
 * * Have loggedin right after registered.
 *
 * @params name, username:email, password, roleId
 */
exports.register = catchAsync(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ status: 'fail', message: error.details[0].message });

  let user = await User.findOne({ where: { username: req.body.username } });
  if (user) return res.status(400).json('User already registered');

  user = User.build(_.pick(req.body, ['name', 'username', 'password', 'roleId']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = jwt.sign({ userId: user.userId, username: user.username, roleId: user.roleId }, process.env.JWT_PRIVATE_KEY);

  return res
    .header('x-auth-token', token)
    .status(200)
    .json({ status: 'success', data: _.pick(user, ['userId', 'name', 'username']) });
});
