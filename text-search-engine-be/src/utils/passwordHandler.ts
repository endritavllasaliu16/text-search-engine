import bcrypt from "bcryptjs";

export const HashPassword = async (pwd: string) => await bcrypt.hash(pwd, 10);

export const ComparePassword = async (
	password: string,
	hashedPassword: string,
) => {
	return new Promise((resolve, reject) => {
		try {
			resolve(bcrypt.compareSync(password, hashedPassword));
		} catch (e) {
			reject(e);
		}
	});
};
