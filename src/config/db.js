import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("db is connected");
  } catch (error) {
    console.log("ERROR IN DB->", error);
  }
};

export default connectDB;
