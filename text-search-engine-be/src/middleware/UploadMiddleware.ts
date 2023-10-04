import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dirPath = path.join(__dirname, "..", "pdfs");
		cb(null, dirPath);
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + "-" + file.originalname);
	},
});

const fileFilter = (req: any, file: any, cb: any) => {
	// Accept only PDF
	if (file.mimetype === "application/pdf") {
		cb(null, true);
	} else {
		cb(null, false);
		cb(new Error("Only PDF files are allowed!"));
	}
};

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5, // limit to 5MB
	},
	fileFilter: fileFilter,
});
