import { ReactNode } from "react";

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("react-router-dom", () => {
	const originalModule = jest.requireActual("react-router-dom");

	return {
		...originalModule,
		BrowserRouter: ({ children }: { children: ReactNode }) => (
			<div>{children}</div>
		),
	};
});

describe("App", () => {
	it("renders without crashing", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>,
		);
	});

	it("renders RootRedirect component for / path", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>,
		);
		// You should add some assertions here
	});

	it("renders AuthRedirectedLogin component for /login path", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>,
		);
		// You should add some assertions here
	});
});
