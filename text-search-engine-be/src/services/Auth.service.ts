import {
	ComparePassword,
	GenerateJWT,
	HashPassword,
	failure,
	ok,
} from "../utils";

import { StatusCodeEnums } from "../interfaces/enums/StatusCode.enums";

import { UserModel } from "../database";

export const AuthService = {
	async register(name: string, email: string, password: string) {
		let user = await UserModel.findOne({ email });
		if (user) {
			return failure("User already exists", StatusCodeEnums.USER_EXISTS);
		}

		const hashedPwd = await HashPassword(password);
		user = new UserModel({ name, email, password: hashedPwd });

		await user.save();

		return ok({
			id: user.id,
			name,
			email,
			token: GenerateJWT(user),
		});
	},

	async login(email: string, password: string) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return failure(
				"User not found",
				StatusCodeEnums.INVALID_CREDENTIALS,
			);
		}

		const isPasswordCorrect = await ComparePassword(
			password,
			user.password,
		);
		if (!isPasswordCorrect) {
			return failure(
				"Incorrect password",
				StatusCodeEnums.INVALID_CREDENTIALS,
			);
		}

		return ok({
			id: user.id,
			email: user.email,
			token: GenerateJWT(user),
		});
	},
};
