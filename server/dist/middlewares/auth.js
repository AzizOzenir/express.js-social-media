"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const unatuhorized_1 = require("../exceptions/unatuhorized");
const root_1 = require("../exceptions/root");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const __1 = require("..");
const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("token", token);
        if (!token) {
            next(new unatuhorized_1.UnauthorizedException("Unauthorized (You have not logged in)", root_1.ErrorCode.UNAUTHORIZED));
        }
        const payload = jwt.verify(token, secrets_1.JWT_SECRET);
        const user = await __1.prismaClient.user.findFirst({
            where: { id: payload.userId },
        });
        if (!user) {
            next(new unatuhorized_1.UnauthorizedException("Unauthorized (No User Exist)", root_1.ErrorCode.UNAUTHORIZED));
        }
        req.user = user;
    }
    catch (error) {
        next(new unatuhorized_1.UnauthorizedException(`Something else went wrong: ${error}`, root_1.ErrorCode.UNAUTHORIZED));
    }
};
exports.authMiddleWare = authMiddleWare;
//# sourceMappingURL=auth.js.map