import express from "express";
import * as controller from "./controller.js";
import protectedRoute from "../utils/protectedRoute.js";
const router = express.Router();

router.get("/chatlist/:id", protectedRoute, controller.getMessages);
router.post("/send/:id", protectedRoute, controller.sendMessage);

export default router;
