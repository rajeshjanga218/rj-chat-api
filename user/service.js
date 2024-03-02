import User from "../models/user.model.js";

export async function signUp(user, res) {
  const { username, fullName, password, confirmPassword, gender, profilePic } =
    user;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn' match" });
    }

    return "rajesh";

    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: "user already exists" });

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic,
    });

    await newUser.save();
    return "rajesh";
  } catch (e) {
    console.log(e.message);
  }
}

export async function logIn() {
  console.log("logIn user");
  return "logIn user";
}
