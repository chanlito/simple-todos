import 'winston-daily-rotate-file';

import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

// make a logs directory if it does not exists
const logsDir = path.resolve('.', 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

// set max log level
const level = process.env.LOG_LEVEL || 'debug';

// configure daily log rotation options
const dailyRotateCommonOpts = { datePattern: 'yyyy-MM-dd.', prepend: true };

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

// create logger
export const logger = new winston.Logger({
  level,
  transports: [...logToConsole, ...logToFiles]
});
