import 'winston-daily-rotate-file';

import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

import { LoggerToken } from './logger.constants';

// set max log level
const level = process.env.LOG_LEVEL || 'debug';

// configure daily log rotation options
const dailyRotateCommonOpts = { datePattern: 'yyyy-MM-dd.', prepend: true };

// make a logs directory if it does not exists
const logsDir = path.resolve('.', 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

// define logger transports
const logToConsole = [
  new winston.transports.Console({
    colorize: true,
    prettyPrint: true,
    timestamp: true
  })
];
const logToFiles = [
  new winston.transports.DailyRotateFile({
    filename: logsDir + '/info.log',
    level: 'info',
    name: 'info',
    ...dailyRotateCommonOpts
  }),
  new winston.transports.DailyRotateFile({
    filename: logsDir + '/debug.log',
    level: 'debug',
    name: 'debug',
    tailable: true,
    ...dailyRotateCommonOpts
  }),
  new winston.transports.DailyRotateFile({
    filename: logsDir + '/error.log',
    level: 'error',
    name: 'error',
    tailable: true,
    ...dailyRotateCommonOpts
  })
];

export const loggerProviders = [
  {
    provide: LoggerToken,
    useValue: new winston.Logger({
      level,
      transports: [...logToConsole, ...logToFiles]
    })
  }
];
