require('express-async-errors');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

module.exports = function () {
  const logger = createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      prettyPrint()
    ),
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
    new transports.File({
      format: timestamp('YYYY-MM-DD HH:mm:ss'),
      filename: './src/logs/exceptions.log',
    }),
    new transports.Console()
  );

  logger.rejections.handle(
    new transports.File({
      format: timestamp('YYYY-MM-DD HH:mm:ss'),
      filename: './src/logs/rejections.log',
    })
  );

  logger.stream = {
    write: function (message) {
      logger.info(message);
    },
  };

  return logger;
};
