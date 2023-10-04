import { StatusCodeEnums } from "../interfaces/enums/StatusCode.enums";

export const baseStatusResponse = {
	statusCode: StatusCodeEnums.OK,
	statusIsOk: true,
	statusMessage: "",
	statusPath: "",
};
