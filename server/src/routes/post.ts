import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post";
const postRoutes: Router = Router();

postRoutes.get("/getPosts", errorHandler(getPosts) as any);
postRoutes.get("/getPost/:id", errorHandler(getPost) as any);
postRoutes.post("/createPost", errorHandler(createPost) as any);
postRoutes.post("/updatePost/:id", errorHandler(updatePost) as any);
postRoutes.delete("/deletePost/:id", errorHandler(deletePost) as any);

export default postRoutes;
