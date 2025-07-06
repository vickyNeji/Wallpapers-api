import express from "express";
const app = express();
import connect from "./database/connect.js";
import dotenv from "dotenv";
import routeNotFound from "./middle-ware/not-found.js";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import adminRouter from "./routes/adminapi.js";
import userRouter from "./routes/userRoutes.js";
import errorHandlerMiddleWare from "./middle-ware/error-handler.js";

// cloudinary

cloudinary.config({
  cloud_name: "dghayv46b",
  api_key: "559642735797832",
  api_secret: "g-ja1JwbZT0v0LA9Onx7_xmmxyA",
});

const port = process.env.PORT || 5000;

// dot-env
dotenv.config();

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "It worked",
  });
});

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/user", userRouter);

app.use(routeNotFound);

//app.use(errorHandlerMiddleWare);

const start = async () => {
  await connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log("Server up and running");
  });
};

start();
