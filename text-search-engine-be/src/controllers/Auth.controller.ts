import { NextFunction, Request, Response, Router } from "express";

import { AuthService } from "../services/Auth.service";

export const AuthController: Router = Router();

AuthController.post(
	"/register",
	(req: Request, res: Response, next: NextFunction) => {
		(async () => {
			try {
				const { name, email, password } = req.body;
				const result = await AuthService.register(
					name,
					email,
					password,
				);
				res.status(result.httpCode).send(result.data);
			} catch (e) {
				next(e);
			}
		})();
	},
);

AuthController.post(
	"/login",
	(req: Request, res: Response, next: NextFunction) => {
		(async () => {
			try {
				const { email, password } = req.body;
				const result = await AuthService.login(email, password);
				res.status(result.httpCode).send(result.data);
			} catch (e) {
				next(e);
			}
		})();
	},
);
