import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createPostTag,
  deletePostTag,
  getPostTag,
  getPostTags,
  updatePostTag,
} from "../controllers/post_tag";
const posttagRoutes: Router = Router();

posttagRoutes.get("/getPosttags", errorHandler(getPostTags) as any);
posttagRoutes.get("/getPosttag/:id", errorHandler(getPostTag) as any);
posttagRoutes.post("/createPosttag", errorHandler(createPostTag) as any);
posttagRoutes.post("/updatePosttag/:id", errorHandler(updatePostTag) as any);
posttagRoutes.delete("/deletePosttag/:id", errorHandler(deletePostTag) as any);

export default posttagRoutes;
