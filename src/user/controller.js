import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export async function signUp(req, res) {
  try {
    const {
      username,
      fullName,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn' match" });
    }

    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });

    if (!newUser) return res.status(400).json({ error: "invalid data" });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function logIn(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      (user && user.password) || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      token: token,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export function logOut(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function getSignedUrlForProfilePicUpload() {}
