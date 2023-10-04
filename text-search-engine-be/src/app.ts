import express, { Application } from "express";
import bodyParser from "body-parser";
import path from "path";

import { routes } from "./routes";
import { CorsMiddleware } from "./middleware/CorsMiddleware";
import { AppErrorHandlerMiddleware } from "./middleware/AppErrorHandlerMiddleware";

// Boot express
export const app: Application = express();

// CORS
app.use(CorsMiddleware);

// Express configuration
app.use(bodyParser.json());

// Application routing
routes(app);

// Application (global) error handling
app.use(AppErrorHandlerMiddleware);

app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));
