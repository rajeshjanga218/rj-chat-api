import mongoose from "mongoose";

async function dbConnect() {
  try {
    const db = await mongoose.connect(process.env.CONNECTION_STRING || "");
    console.log("db connected");
  } catch (error) {
    throw new Error("connection failed!");
  }
}

export default dbConnect;
