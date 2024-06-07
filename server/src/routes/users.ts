import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user";

const userRoutes: Router = Router();

userRoutes.get("/getUsers", errorHandler(getUsers) as any);
userRoutes.get("/getUser/:id", errorHandler(getUser) as any);
userRoutes.post("/createUser", errorHandler(createUser) as any);
userRoutes.post("/updateUser/:id", errorHandler(updateUser) as any);
userRoutes.post("/deleteUser/:id", errorHandler(deleteUser) as any);

export default userRoutes;
