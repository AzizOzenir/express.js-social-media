import { Router } from "express";
import { errorHandler } from "../error_handler";
import { createGroupMember, deleteGroupMember, getGroupMember, getGroupMembers, updateGroupMember } from "../controllers/group_member";
const groupmemberRoutes: Router = Router();

groupmemberRoutes.get("/getGroupmembers", errorHandler(getGroupMembers) as any);
groupmemberRoutes.get("/getGroupmember/:id", errorHandler(getGroupMember) as any);
groupmemberRoutes.post("/createGroupmember", errorHandler(createGroupMember) as any);
groupmemberRoutes.post("/updateGroupmember/:id", errorHandler(updateGroupMember) as any);
groupmemberRoutes.delete("/deleteGroupmember/:id", errorHandler(deleteGroupMember) as any);

export default groupmemberRoutes;