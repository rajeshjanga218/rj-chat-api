import express from "express";
import * as controller from "./controller.js";
import protectedRoute from "../utils/protectedRoute.js";

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/login", controller.logIn);
router.post("/logout", controller.logOut);
router.get("/getAllUsers", protectedRoute, controller.getAllUsers);
router.get(
  "/profilepicture/upload/signedurl",
  controller.getSignedUrlForProfilePicUpload
);

export default router;
