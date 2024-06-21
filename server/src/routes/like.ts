import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createLike,
  deleteLike,
  getLike,
  getLikes,
  updateLike,
} from "../controllers/like";
const likeRoutes: Router = Router();

likeRoutes.get("/getLikes", errorHandler(getLikes) as any);
likeRoutes.get("/getLike/:id", errorHandler(getLike) as any);
likeRoutes.post("/createLike", errorHandler(createLike) as any);
likeRoutes.post("/updateLike/:id", errorHandler(updateLike) as any);
likeRoutes.delete("/deleteLike/:id", errorHandler(deleteLike) as any);

export default likeRoutes;
