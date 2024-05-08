import "dotenv/config";
import express from "express";
import userRouter from "./user/router.js";
import messageRouter from "./messages/router.js";
import dbConnect from "./db/dbConnection.js";
import cookieParser from "cookie-parser";
import { validateEnv } from "./config/env.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";

if (!validateEnv()) {
  process.exit();
}


const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: [process.env.UI_ORIGIN],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("ok!");
});

app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  dbConnect();
  console.log(`server running on port ${PORT}`);
});
