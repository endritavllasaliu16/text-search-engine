import { NextFunction, Request, Response, Router } from "express";

import { AuthorizationMiddleware, upload } from "../middleware";

import { FileService } from "../services/File.service";

export const FileController: Router = Router();

FileController.post(
	"/",
	AuthorizationMiddleware,
	upload.array("pdfFiles", 20),
	(req: Request, res: Response, next: NextFunction) => {
		(async () => {
			try {
				const { user: { id } = {} } = req;
				const files = req.files as Express.Multer.File[];

				if (!files || files.length === 0 || !id) {
					res.status(400).send({
						message: "Missing files or user id",
					});
					return;
				}

				const result = await FileService.uploadAndAnalyze(files, id);

				res.status(result.httpCode).send(result.data);
			} catch (e) {
				next(e);
			}
		})();
	},
);

FileController.get(
	"/",
	AuthorizationMiddleware,
	(req: Request, res: Response, next: NextFunction) => {
		(async () => {
			try {
				const { user: { id } = {} } = req;

				const result = await FileService.getFiles(id);

				res.status(result.httpCode).send(result.data);
			} catch (e) {
				next(e);
			}
		})();
	},
);
