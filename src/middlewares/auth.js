const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ status: 'fail', message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: 'Invalid token.' });
  }
};
