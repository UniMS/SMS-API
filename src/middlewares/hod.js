module.exports = function (req, res, next) {
  const roleId = req.user.roleId;
  if (!roleId)
    return res
      .status(403)
      .json({
        status: 'fail',
        message: "Access denied. DEV_MSG: You didn't login.",
      });

  /**
   * * Role-Based Access Control
   * RoleId |  Name       |  Major
   * ---------------------|---------
   * 1      |  official   |  All
   * 2      |  office     |  All
   * 3      |  ict_hod    |  ICT(1), IST(2)
   * 4      |  ce_hod     |  CE(3)
   * 5      |  ece_hod    |  EcE(4)
   * 6      |  pre_hod    |  Pre(5)
   * 7      |  ame_hod    |  Ame(6)
   */
  if (roleId === 1 || roleId === 2) req.majors = [1, 2, 3, 4, 5, 6];
  else if (roleId === 3) req.majors = [1, 2];
  else if (roleId === 4) req.majors = [3];
  else if (roleId === 5) req.majors = [4];
  else if (roleId === 6) req.majors = [5];
  else if (roleId === 7) req.majors = [6];

  next();
};
