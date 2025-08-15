import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '10m',
  maxFiles: '7d',       // só mantém uma semana de logs
  zippedArchive: true,
});

const errorRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  maxSize: '10m',
  maxFiles: '14d',      // mantém erros por 2 semanas
  zippedArchive: true,
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    dailyRotateFileTransport,
    errorRotateFileTransport,
  ],
  exitOnError: false,
});

export default logger;
