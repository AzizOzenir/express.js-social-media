import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createActivityLog,
  deleteActivityLog,
  getActivityLog,
  getActivityLogs,
  updateActivityLog,
} from "../controllers/activity_log";
const activitylogRoutes: Router = Router();

activitylogRoutes.get("/getActivitylogs", errorHandler(getActivityLogs) as any);
activitylogRoutes.get(
  "/getActivitylog/:id",
  errorHandler(getActivityLog) as any
);
activitylogRoutes.post(
  "/createActivitylog",
  errorHandler(createActivityLog) as any
);
activitylogRoutes.post(
  "/updateActivitylog/:id",
  errorHandler(updateActivityLog) as any
);
activitylogRoutes.delete(
  "/deleteActivitylog/:id",
  errorHandler(deleteActivityLog) as any
);

export default activitylogRoutes;
