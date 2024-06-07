"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 1004] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 1005] = "UNPROCESSABLE_ENTITY";
    //t the action could not be processed properly due to invalid data provided.
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 1006] = "INTERNAL_EXCEPTION";
    //caused when your network connection to the server is not fast or stable enough to download data from the server
    ErrorCode[ErrorCode["CONSTRAINT_VIOLATION"] = 1007] = "CONSTRAINT_VIOLATION";
    // typically occurs when there's an attempt to violate a constraint defined at the database level.
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=root.js.map