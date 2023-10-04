import { baseStatusResponse } from "./baseStatusResponse";
import { ResponseModel } from "../interfaces/models/Response.model";
import { StatusCodeEnums } from "../interfaces/enums/StatusCode.enums";

export const ok = (data: object, httpCode: number = 200): ResponseModel => ({
	data: { ...baseStatusResponse, ...data },
	httpCode,
});

export const okWithoutBaseResponse = (
	data: object,
	httpCode: number = 200,
): ResponseModel => ({
	data: { ...data },
	httpCode,
});

export const failure = (
	data: object | string,
	statusCode: StatusCodeEnums = StatusCodeEnums.UNEXPECTED,
	httpCode: number = 200,
): ResponseModel => {
	return {
		data: {
			...baseStatusResponse,
			statusCode,
			statusIsOk: false,
			...(typeof data === "string" ? { statusMessage: data } : data),
		},
		httpCode,
	};
};
