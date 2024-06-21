import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event";
const eventRoutes: Router = Router();

eventRoutes.get("/getEvents", errorHandler(getEvents) as any);
eventRoutes.get("/getEvent/:id", errorHandler(getEvent) as any);
eventRoutes.post("/createEvent", errorHandler(createEvent) as any);
eventRoutes.post("/updateEvent/:id", errorHandler(updateEvent) as any);
eventRoutes.delete("/deleteEvent/:id", errorHandler(deleteEvent) as any);

export default eventRoutes;
