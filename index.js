import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./user/router.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("ok!");
});

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
