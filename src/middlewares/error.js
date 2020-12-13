const logger = require('../startup/logger')();

module.exports = function (app) {
  app.use((err, req, res, next) => {
    logger.error(err.message, err);

    return res.status(500).json({
      status: 'error',
      message:
        'Something failed. Please try again later. DEV_MSG: FROM Error Middleware',
    });
  });
};
