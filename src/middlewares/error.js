const logger = require('../startup/logger')();

module.exports = function (app) {
  app.use((err, req, res, next) => {
    logger.error(err.message, err);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });
};
