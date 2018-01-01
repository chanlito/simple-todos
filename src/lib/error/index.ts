import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

const { NODE_ENV } = process.env;
const errorTitle = `\n ¯\\_(ツ)_/¯ Meh, it's just an error! Don't worry about it. \n`;

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(err: any, res: Response) {
    if (err instanceof Error) {
      console.error(errorTitle, err);
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      res.status(statusCode).json({
        statusCode,
        message: 'Internal Server Error',
        error: NODE_ENV !== 'production' ? err : undefined
      });
    } else {
      const statusCode = err.getStatus();
      const response = err.getResponse();

      if (typeof response === 'string') {
        console.error(errorTitle, response);
        res.status(statusCode).json({
          statusCode,
          message: response
        });
      } else if (typeof response.message === 'string') {
        console.error(errorTitle, response.message);
        res.status(statusCode).json({
          statusCode,
          message: response.message
        });
      } else {
        console.error(errorTitle, JSON.stringify(response.message, null, 2));
        res.status(statusCode).json({
          statusCode,
          ...response.message
        });
      }
    }
  }
}
