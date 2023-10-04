import jwt, { Algorithm } from "jsonwebtoken";

import { JWT_ALGORITHM, JWT_EXPIRES_IN, JWT_SECRET } from "../config/jwt";

import { IUser } from "../database/models/User.model";

export const GenerateJWT = ({ id, name, email }: IUser) => {
	const payload = {
		id: id,
		name: name,
		email: email,
	};

	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
		algorithm: JWT_ALGORITHM as Algorithm,
	});
};
