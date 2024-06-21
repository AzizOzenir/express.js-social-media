import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment";
const commentRoutes: Router = Router();

commentRoutes.get("/getComments", errorHandler(getComment) as any);
commentRoutes.get("/getComment/:id", errorHandler(getComment) as any);
commentRoutes.post("/createComment", errorHandler(createComment) as any);
commentRoutes.post("/updateComment/:id", errorHandler(updateComment) as any);
commentRoutes.delete("/deleteComment/:id", errorHandler(deleteComment) as any);

export default commentRoutes;
