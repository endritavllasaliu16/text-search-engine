import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export interface IUser extends mongoose.Document {
	name: string;
	email: string;
	password: string;
}

export const UserModel = mongoose.model<IUser>("User", userSchema);
