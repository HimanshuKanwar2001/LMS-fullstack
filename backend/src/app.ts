import express, { NextFunction, Request, Response } from "express";
export const app = express();
require("dotenv").config();

import cors from "cors";
import cookieParser from "cookie-parser";
import { Error } from "mongoose";
import { ErrorMiddleware } from "./middleware/error";

export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie-parser
app.use(cookieParser());

//cors=>cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ sucess: "true", message: "API is working" });
});

// app.all("*", (req: Request, res: Response) => {
//   const err = new Error(`Route ${req.originalUrl} not found`) as any;
//   err.statusCode = 404;
//   res.status(err.statusCode).json({ message: err.message });
// });

app.use(ErrorMiddleware);
