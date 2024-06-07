export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNAUTHORIZED = 1004,
  UNPROCESSABLE_ENTITY = 1005,
  //t the action could not be processed properly due to invalid data provided.
  INTERNAL_EXCEPTION = 1006,
  //caused when your network connection to the server is not fast or stable enough to download data from the server
  CONSTRAINT_VIOLATION = 1007,
  // typically occurs when there's an attempt to violate a constraint defined at the database level.
}
