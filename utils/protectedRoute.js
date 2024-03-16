import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }

    req.user = user;

    next();
  } catch (e) {
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectedRoute;
