import { Router } from "express";
import { errorHandler } from "../error_handler";
import { createTag, deleteTag, getTag, getTags, updateTag } from "../controllers/tag";
const tagRoutes: Router = Router();

tagRoutes.get("/getTags", errorHandler(getTags) as any);
tagRoutes.get("/getTag/:id", errorHandler(getTag) as any);
tagRoutes.post("/createTag", errorHandler(createTag) as any);
tagRoutes.post("/updateTag/:id", errorHandler(updateTag) as any);
tagRoutes.delete("/deleteTag/:id", errorHandler(deleteTag) as any);

export default tagRoutes;