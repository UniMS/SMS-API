const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

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

module.exports = logger;
