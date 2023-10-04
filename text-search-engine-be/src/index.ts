import * as dotenv from "dotenv";
dotenv.config();

// Other imports
import { app } from "./app";
import { API_PORT } from "./config/api";
import { connectDb } from "./database";

// Start server
app.listen(API_PORT, () => {
	console.log(`TSE API is listening on port ${API_PORT}!`);
	// Connect to MongoDB when the app starts
	connectDb();
});
