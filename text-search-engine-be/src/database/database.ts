import mongoose from "mongoose";

import { DB_CONNECTION } from "../config/mongo";

export const connectDb = async () => {
	try {
		await mongoose.connect(DB_CONNECTION);

		console.log("MongoDB connected successfully.");
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		process.exit(1);
	}
};
