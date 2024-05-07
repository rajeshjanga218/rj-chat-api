import jwt from "jsonwebtoken";

function generateTokenAndSetCookie(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 1000,
    httpOnly: true, //prevent XSS attack
    sameSite: "strict", // CSRF attack
    secure: true,
    // secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return token;
}

export default generateTokenAndSetCookie;
