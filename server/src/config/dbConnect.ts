import dotenv from "dotenv";
dotenv.config();

import mongoose, { type Connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("The MONGO_URI is not defined in .env");
}
console.log(MONGO_URI);

let isConnected: boolean = false;

let connection: Connection | null = null;

export const dbConnect = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return connection;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, { dbName: "dev" });

    connection = db.connection;
    isConnected = connection.readyState === 1;

    console.log("Database connection successfully");

    connection.on("disconnected", () => console.warn("MongoDB Disconnected"));
    connection.on("error", (error) =>
      console.error("MongoDB runtime error:\n", error),
    );

    return connection;
  } catch (error) {
    console.error("Database connection error:\n", error);
    process.exit(1);
  }
};
