"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const users_1 = require("../schema/users");
const bad_requests_1 = require("../exceptions/bad_requests");
const root_1 = require("../exceptions/root");
const index_1 = require("./../index");
const bcrypt_1 = require("bcrypt");
const not_found_1 = require("../exceptions/not_found");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const signup = async (req, res, next) => {
    users_1.signupSchema.parse(req.body);
    const { email, password, username } = await req.body;
    let user = await index_1.prismaClient.user.findFirst({ where: { email } });
    if (user) {
        next(new bad_requests_1.BadRequestException("User already exists!", root_1.ErrorCode.USER_ALREADY_EXISTS));
    }
    user = await index_1.prismaClient.user.create({
        data: {
            username: username,
            email: email,
            password: (0, bcrypt_1.hashSync)(password, 10),
        },
    });
    res.json(user);
};
exports.signup = signup;
const login = async (req, res, next) => {
    const { email, password } = await req.body;
    let user = await index_1.prismaClient.user.findFirst({ where: { email } });
    console.log("userr", user);
    if (!user) {
        throw new not_found_1.NotFoundException("User does not exists!", root_1.ErrorCode.USER_NOT_FOUND);
    }
    if (!(0, bcrypt_1.compareSync)(password, user.password)) {
        throw new bad_requests_1.BadRequestException("incorrect password", root_1.ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
    }, secrets_1.JWT_SECRET);
    res.json({ user: user, token: token });
};
exports.login = login;
/*
export const me = async (req: Request, res: Response) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
 */ 
//# sourceMappingURL=auth.js.map