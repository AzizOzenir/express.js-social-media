"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const root_1 = require("./root");
class BadRequestException extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 400, null);
        console.log("x");
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=bad_requests.js.map