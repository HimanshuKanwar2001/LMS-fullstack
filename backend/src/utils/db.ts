import mongoose from "mongoose";

require("dotenv").config();

const dbUrl: string = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log("Database connected to " + data.connection.host);
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
