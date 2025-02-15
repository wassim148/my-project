import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string[] };
    const error =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse.error;
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse.message;
    const statusCode =
      typeof exceptionResponse === 'object'
        ? exceptionResponse.statusCode
        : status;

    response.status(statusCode).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode,
      error,
      message,
    });
  }
}
