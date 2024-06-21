import { Router } from "express";
/* import { login, me, signup } from "../controllers/auth"; */
import { errorHandler } from "../error_handler";
import { login, signup, me } from "../controllers/auth";
import { authMiddleWare } from "../middlewares/auth";
/* import { authMiddleWare } from "../middlewares/auth"; */

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup) as any);
authRoutes.post("/login", errorHandler(login) as any);
authRoutes.get("/me", [authMiddleWare as any], errorHandler(me) as any);
export default authRoutes;
