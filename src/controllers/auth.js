const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../database/models');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ status: 'fail', message: error.details[0].message });

  let user = await models.User.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(400).json('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json('Invalid email or password.');

  const token = jwt.sign({ userId: user.userId, username: user.username, roleId: user.roleId }, process.env.JWT_PRIVATE_KEY);

  return res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().max(255).required(),
  });

  return schema.validate(req);
}
