import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/errors";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./secrets";
import rootRouter from "./routes";

export const prismaClient = new PrismaClient({
/*   log: ["query"],
 */});

const app = express();
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

// Optionally, you can configure CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use("/api", rootRouter);
app.listen(PORT, () => {
  return console.log(
    `Express server is listening at http://localhost:${PORT} 🚀`
  );
});
