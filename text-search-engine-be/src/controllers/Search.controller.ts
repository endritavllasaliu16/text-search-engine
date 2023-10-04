import { NextFunction, Request, Response, Router } from "express";
import { AuthorizationMiddleware } from "../middleware";
import { SearchService } from "../services/Search.service";

export const SearchController: Router = Router();

SearchController.get(
	"/:query",
	AuthorizationMiddleware,
	(req: Request, res: Response, next: NextFunction) => {
		(async () => {
			try {
				const { user: { id } = {} } = req;
				const query = req.params.query;

				if (!query || !id) {
					res.status(400).send({
						message: "Missing search query or user id",
					});
					return;
				}

				const result = await SearchService.search(query, id);
				res.status(result.httpCode).send(result.data);
			} catch (e) {
				next(e);
			}
		})();
	},
);
