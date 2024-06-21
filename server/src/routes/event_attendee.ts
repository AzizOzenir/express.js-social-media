import { Router } from "express";
import { errorHandler } from "../error_handler";
import { createEventAttendee, deleteEventAttendee, getEventAttendee, getEventAttendees, updateEventAttendee } from "../controllers/event_attendee";
const eventattendeeRoutes: Router = Router();

eventattendeeRoutes.get("/getEventattendees", errorHandler(getEventAttendees) as any);
eventattendeeRoutes.get("/getEventattendee/:id", errorHandler(getEventAttendee) as any);
eventattendeeRoutes.post("/createEventattendee", errorHandler(createEventAttendee) as any);
eventattendeeRoutes.post("/updateEventattendee/:id", errorHandler(updateEventAttendee) as any);
eventattendeeRoutes.delete("/deleteEventattendee/:id", errorHandler(deleteEventAttendee) as any);

export default eventattendeeRoutes;