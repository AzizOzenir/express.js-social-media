import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createFriendRequest,
  deleteFriendRequest,
  getFriendRequest,
  getFriendRequests,
  updateFriendRequest,
} from "../controllers/friend_request";
const friendrequestRoutes: Router = Router();

friendrequestRoutes.get("/getFriendrequests", errorHandler(getFriendRequests) as any);
friendrequestRoutes.get("/getFriendrequest/:id", errorHandler(getFriendRequest) as any);
friendrequestRoutes.post(
  "/createFriendrequest",
  errorHandler(createFriendRequest) as any
);
friendrequestRoutes.post(
  "/updateFriendrequest/:id",
  errorHandler(updateFriendRequest) as any
);
friendrequestRoutes.delete(
  "/deleteFriendrequest/:id",
  errorHandler(deleteFriendRequest) as any
);

export default friendrequestRoutes;
