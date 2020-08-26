const _ = require('lodash');
const { User } = require('../database/models');
const { validate } = require('../database/models/user');

/**
 * Register a new user
 * * Have loggedin right after registered.
 *
 * @params name, username:email, password, roleId
 */
exports.register = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: 'fail', message: error.details[0].message });

  let user = await User.findOne({ where: { username: req.body.username } });
  if (user) return res.status(400).json('User already registered');

  user = User.build(
    _.pick(req.body, ['name', 'username', 'password', 'roleId'])
  );
  user.password = await user.hashPassword(user.password);
  await user.save();

  const token = user.generateAuthToken();

  return res
    .header('x-auth-token', token)
    .status(200)
    .json({
      status: 'success',
      data: _.pick(user, ['userId', 'name', 'username']),
    });
};

/**
 * Get current user information
 */
exports.getMe = async (req, res) => {
  let user = await User.findByPk(req.user.userId);
  user = _.pick(user, ['name', 'username', 'roleId']);

  return res.status(200).json({ status: 'success', data: { user } });
};
