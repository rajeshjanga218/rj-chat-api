import express from "express";
import * as controller from "./controller.js";

const router = express.Router();

router.post("/signup", controller.signUp);
router.get("/login", controller.logIn);

export default router;
