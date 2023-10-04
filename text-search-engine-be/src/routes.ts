import { Application, Router } from "express";

import {
	AuthController,
	FileController,
	PingController,
	SearchController,
} from "./controllers";

const _routes: [string, Router][] = [
	["/ping", PingController],
	["/auth", AuthController],
	["/upload", FileController],
	["/search", SearchController],
];

export const routes = (app: Application) => {
	_routes.forEach((route) => {
		const [url, controller] = route;
		app.use(url, controller);
	});
};
