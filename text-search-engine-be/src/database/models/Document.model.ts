import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

interface IDocument extends MongooseDocument {
	userID: string;
	originalDocumentName: string;
	documentName: string;
	documentContent: string;
	invertedIndex: {
		[stemmedToken: string]: number[];
	};
	tfidfData: Map<string, number>;
	uploadDate: Date;
}

const DocumentSchema: Schema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	originalDocumentName: {
		type: String,
		required: true,
	},
	documentName: {
		type: String,
		required: true,
	},
	documentContent: {
		type: String,
		required: true,
	},
	invertedIndex: {
		type: Map,
		of: [Number],
	},
	tfidfData: {
		type: Map,
		of: Number,
	},
	uploadDate: {
		type: Date,
		default: Date.now,
	},
});

export const DocumentModel = mongoose.model<IDocument>(
	"Document",
	DocumentSchema,
);
