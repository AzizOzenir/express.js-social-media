import { Router } from "express";
import { errorHandler } from "../error_handler";
import { createMessage, deleteMessage, getMessage, getMessages, updateMessage } from "../controllers/message";
const messageRoutes: Router = Router();

messageRoutes.get("/getMessages", errorHandler(getMessages) as any);
messageRoutes.get("/getMessage/:id", errorHandler(getMessage) as any);
messageRoutes.post("/createMessage", errorHandler(createMessage) as any);
messageRoutes.post("/updateMessage/:id", errorHandler(updateMessage) as any);
messageRoutes.delete("/deleteMessage/:id", errorHandler(deleteMessage) as any);

export default messageRoutes;