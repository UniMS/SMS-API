module.exports = function (req, res, next) {
  if (!req.user.roleId || req.user.roleId !== 1) return res.status(403).json({ status: 'fail', message: 'Access denied' });

  next();
};
