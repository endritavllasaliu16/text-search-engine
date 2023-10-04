import { NextFunction, Request, Response, Router } from "express";

export const PingController: Router = Router();

PingController.get("/", (req: Request, res: Response, next: NextFunction) => {
	(async () => {
		try {
			res.status(200).send({ data: "Say Pong!" });
		} catch (e) {
			next(e);
		}
	})();
});
