import { WordTokenizer, PorterStemmer } from "natural";
import fs from "fs";
import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { DocumentModel } from "../database";
import { failure, ok } from "../utils";
import { StatusCodeEnums } from "../interfaces/enums/StatusCode.enums";
import { API_DOCS_URL } from "../config/api";

const pdfExtract = new PDFExtract();
const options: PDFExtractOptions = {};
const tokenizer = new WordTokenizer();

export const FileService = {
	async uploadAndAnalyze(files: any[], userId: string) {
		const results = await Promise.all(
			files.map(async (file) => {
				const documentName = file.originalname;
				const fileContent: any = fs.readFileSync(file.path);
				const data = await this.extractPDFContent(fileContent, options);

				let documentContent = "";
				data.pages.forEach((page: any) => {
					page.content.forEach((item: any) => {
						if (item.str) {
							documentContent += item.str + " ";
						}
					});
				});

				const tokens = tokenizer.tokenize(documentContent);

				const stemmedTokens =
					tokens?.map((token) => PorterStemmer.stem(token)) ?? [];

				// Calculate the inverted index
				const invertedIndex: Map<string, number[]> = new Map();
				stemmedTokens?.forEach((token, index) => {
					if (invertedIndex.has(token)) {
						invertedIndex.get(token)!.push(index);
					} else {
						invertedIndex.set(token, [index]);
					}
				});

				// Calculate the TF-IDF for every token in the document
				const documentTFIDF: Map<string, number> = new Map();
				const totalDocs = await DocumentModel.countDocuments();
				for (const [token, indices] of invertedIndex) {
					const tf = indices.length / stemmedTokens.length;
					const docsContainingToken =
						await DocumentModel.countDocuments({
							[`invertedIndex.${token}`]: { $exists: true },
						});

					const idf = Math.log(
						(1 + totalDocs) / (1 + docsContainingToken),
					);
					documentTFIDF.set(token, tf * idf);
				}

				const newDocument = new DocumentModel({
					userID: userId,
					originalDocumentName: file.filename,
					documentName,
					documentContent: documentContent,
					invertedIndex: invertedIndex,
					tfidfData: documentTFIDF,
				});

				await newDocument.save();

				return newDocument;
			}),
		);

		// Return the array of documents
		return ok({ data: results });
	},

	async extractPDFContent(
		fileContent: Buffer,
		options: PDFExtractOptions,
	): Promise<any> {
		return new Promise((resolve, reject) => {
			pdfExtract.extractBuffer(fileContent, options, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		});
	},

	async getFiles(userId?: string) {
		if (!userId)
			return failure("Missing credentials", StatusCodeEnums.UNAUTHORIZED);

		const userDocuments = await DocumentModel.find({ userID: userId });
		userDocuments.forEach((file: any) => {
			file.originalDocumentName = `${API_DOCS_URL}${file.originalDocumentName}`;
		});

		return ok({ data: userDocuments });
	},
};
