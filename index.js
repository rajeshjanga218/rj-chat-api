import "dotenv/config";
import express from "express";
import userRouter from "./user/router.js";
import messageRouter from "./messages/router.js";
import dbConnect from "./db/dbConnection.js";
import cookieParser from "cookie-parser";
import { validateEnv } from "./config/env.js";
import cors from "cors";

if (!validateEnv()) {
  process.exit();
}

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // If you're using cookies or sessions
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("ok!");
});

app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  dbConnect();
  console.log(`server running on port ${PORT}`);
});
