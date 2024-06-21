import { Router } from "express";
import { errorHandler } from "../error_handler";
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from "../controllers/group";
const groupRoutes: Router = Router();

groupRoutes.get("/getGroups", errorHandler(getGroups) as any);
groupRoutes.get("/getGroup/:id", errorHandler(getGroup) as any);
groupRoutes.post("/createGroup", errorHandler(createGroup) as any);
groupRoutes.post("/updateGroup/:id", errorHandler(updateGroup) as any);
groupRoutes.delete("/deleteGroup/:id", errorHandler(deleteGroup) as any);

export default groupRoutes;