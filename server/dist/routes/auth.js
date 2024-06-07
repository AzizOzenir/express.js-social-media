"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* import { login, me, signup } from "../controllers/auth"; */
const error_handler_1 = require("../error_handler");
const auth_1 = require("../controllers/auth");
/* import { authMiddleWare } from "../middlewares/auth"; */
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, error_handler_1.errorHandler)(auth_1.signup));
authRoutes.post("/login", (0, error_handler_1.errorHandler)(auth_1.login));
/* authRoutes.get("/me", [authMiddleWare as any], errorHandler(me) as any);
 */ exports.default = authRoutes;
//# sourceMappingURL=auth.js.map