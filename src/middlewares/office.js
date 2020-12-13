module.exports = function (req, res, next) {
  const roleId = req.user.roleId;
  if (!roleId || roleId !== 2)
    return res
      .status(403)
      .json({
        status: 'fail',
        message: 'Access denied. You are not authorized to do this function.',
      });

  next();
};
