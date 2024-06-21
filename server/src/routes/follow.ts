import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createFollow,
  deleteFollow,
  getFollow,
  getFollows,
  updateFollow,
} from "../controllers/follow";
const followRoutes: Router = Router();

followRoutes.get("/getFollows", errorHandler(getFollows) as any);
followRoutes.get("/getFollow/:id", errorHandler(getFollow) as any);
followRoutes.post("/createFollow", errorHandler(createFollow) as any);
followRoutes.post("/updateFollow/:id", errorHandler(updateFollow) as any);
followRoutes.delete("/deleteFollow/:id", errorHandler(deleteFollow) as any);

export default followRoutes;
