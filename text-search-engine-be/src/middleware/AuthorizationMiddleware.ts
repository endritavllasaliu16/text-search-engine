import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { StatusCodeEnums } from "../interfaces/enums/StatusCode.enums";

import { JWT_SECRET } from "../config/jwt";

export const AuthorizationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (authHeader?.startsWith("Bearer ")) {
		const token = authHeader.split(" ")[1];

		try {
			const decoded = jwt.verify(token, JWT_SECRET) as any;

			req.user = decoded;
			next();
		} catch (error) {
			res.status(401).json({ error: StatusCodeEnums.UNAUTHORIZED });
		}
	} else {
		res.status(401).json({
			error: "Authorization header missing or not in Bearer format",
		});
	}
};
