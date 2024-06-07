import { HttpException, ErrorCode } from "./root";

export class BadRequestException extends HttpException {
  constructor(message: string, errors: any | null, errorCode: ErrorCode) {
    super(message, errorCode, 400, errors);
    console.log("BAD REQUEST");
  }
}
