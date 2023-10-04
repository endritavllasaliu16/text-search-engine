import { failure } from "./responses";
import { StatusCodeEnums } from "../interfaces/enums/StatusCode.enums";

const getTimeDifferenceInMinutes = (date1: Date, date2: Date): number =>
	(date1.getTime() - date2.getTime()) / 60_000;

const invalidTokenResponse = () =>
	failure("INVALID TOKEN", StatusCodeEnums.INVALID_TOKEN);

export const checkoutTokenValidity = async (data: any): Promise<any | void> => {
	if (!data?.expire_at) return invalidTokenResponse();

	const timeDifferenceMinutes = getTimeDifferenceInMinutes(
		new Date(data.expire_at),
		new Date(),
	);

	if (timeDifferenceMinutes < 0 || timeDifferenceMinutes >= 60)
		return invalidTokenResponse();
};
