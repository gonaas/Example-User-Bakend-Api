require("winston-daily-rotate-file");

const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const config = require("./");

const logDir = "log";

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD",
});

const logger = createLogger({
  level: config.env === "development" ? "silly" : "info",
  handleExceptions: true,
  json: true,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "info",
      handleExceptions: true,
      json: false,
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    dailyRotateFileTransport,
  ],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
