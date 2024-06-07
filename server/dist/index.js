"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const errors_1 = require("./middlewares/errors");
const client_1 = require("@prisma/client");
const secrets_1 = require("./secrets");
const routes_1 = __importDefault(require("./routes"));
exports.prismaClient = new client_1.PrismaClient({
/*   log: ["query"],
 */ });
const app = (0, express_1.default)();
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes
// Optionally, you can configure CORS options
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(errors_1.errorMiddleware);
app.use("/api", routes_1.default);
app.listen(secrets_1.PORT, () => {
    return console.log(`Express server is listening at http://localhost:${secrets_1.PORT} 🚀`);
});
//# sourceMappingURL=index.js.map