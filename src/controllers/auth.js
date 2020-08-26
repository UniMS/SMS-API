const _ = require('lodash');
const Joi = require('joi');
const models = require('../database/models');

exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: 'fail', message: error.details[0].message });

  let user = await models.User.findOne({
    where: { username: req.body.username },
  });
  if (!user) return res.status(400).json('Invalid email or password.');

  const validPassword = await user.validatePassword(req.body.password);
  if (!validPassword) return res.status(400).json('Invalid email or password.');

  const token = user.generateAuthToken();
  return res.send(token);
};

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().max(255).required(),
  });

  return schema.validate(req);
}
