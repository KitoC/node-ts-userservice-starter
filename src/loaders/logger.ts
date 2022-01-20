import winston from "winston";
import get from "lodash/get";
import config from "../../_config";

const { printf, label, timestamp, errors, splat } = winston.format;
const transports = [];

if (process.env.NODE_ENV !== "development") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

const myFormat = printf(({ level, message, label, timestamp }) => {
  const appName = process.env.APP_NAME ? `[${process.env.APP_NAME}]` : "";

  return `${timestamp} ${appName} ${level}: ${message}`;
});

const LoggerInstance = winston.createLogger({
  level: get(config, "logs.level", "info"),
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    label({ label: "right meow!" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    splat(),
    myFormat
  ),
  transports,
});

export default LoggerInstance;
