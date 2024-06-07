"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        }
        catch (error) {
            next(console.error(error));
        }
    };
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error_handler.js.map