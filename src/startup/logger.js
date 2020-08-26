const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

module.exports = function () {
  const logger = createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [
      new transports.File({
        level: 'error',
        filename: './src/logs/error-log.log',
      }),
      new transports.File({
        level: 'info',
        filename: './src/logs/combined-log.log',
      }),
    ],
  });

  logger.exceptions.handle(
    new transports.File({ filename: './src/logs/exceptions.log' })
  );

  logger.rejections.handle(
    new transports.File({ filename: './src/logs/rejections.log' })
  );

  return logger;
};
