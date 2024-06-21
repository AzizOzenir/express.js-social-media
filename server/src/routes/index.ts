import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./users";
import activitylogRoutes from "./activity_log";
import commentRoutes from "./comment";
import eventattendeeRoutes from "./event_attendee";
import eventRoutes from "./event";
import followRoutes from "./follow";
import friendrequestRoutes from "./friend_request";
import groupmemberRoutes from "./group_member";
import groupRoutes from "./group";
import messageRoutes from "./message";
import likeRoutes from "./like";
import posttagRoutes from "./post_tag";
import postRoutes from "./post";

import tagRoutes from "./tag";


const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use(userRoutes);
rootRouter.use(tagRoutes);  

rootRouter.use(postRoutes);
rootRouter.use(posttagRoutes);
rootRouter.use(likeRoutes);
rootRouter.use(messageRoutes);
rootRouter.use(groupRoutes);
rootRouter.use(groupmemberRoutes);
rootRouter.use(friendrequestRoutes);
rootRouter.use(followRoutes);
rootRouter.use(eventRoutes);
rootRouter.use(eventattendeeRoutes);
rootRouter.use(commentRoutes);
rootRouter.use(activitylogRoutes);

export default rootRouter;
