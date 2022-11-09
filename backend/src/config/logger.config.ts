import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
  addColors,
} from 'winston';
const { combine, label, timestamp, printf, prettyPrint } = format;
class Logger {
  private static instance: Logger;

  private constructor() {}

  logger: WinstonLogger;

  private formats = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  static get(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  init(): Logger {
    this.logger = createLogger({
      level: 'info',

      format: format.combine(
        label({ label: 'SRC server' }),
        timestamp(),
        this.formats,
        prettyPrint(),
        format.colorize(),
        format.splat()
      ),
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
        new transports.Console({
          format: format.combine(format.colorize()),
        }),
      ],
    });

    addColors({
      info: 'blue',
      warn: 'green',
      http: 'yellow',
      error: 'red',
    });
    return this;
  }
}

const logger = Logger.get().init().logger;

export { logger as Logger };
