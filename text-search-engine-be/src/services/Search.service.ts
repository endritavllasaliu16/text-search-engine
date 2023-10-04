import { WordTokenizer, PorterStemmer } from "natural";
import { DocumentModel } from "../database";
import { ok } from "../utils";
import { API_DOCS_URL } from "../config/api";

const tokenizer = new WordTokenizer();

export const SearchService = {
	async search(query: string, userID: string) {
		const tokens = tokenizer.tokenize(query);
		const stemmedTokens =
			tokens?.map((token) => PorterStemmer.stem(token)) ?? [];

		const userDocuments = await DocumentModel.find({ userID });

		const queryTFIDF: { [token: string]: number } = {};

		for (const token of stemmedTokens) {
			if (!queryTFIDF[token]) {
				queryTFIDF[token] = 0;
			}
			queryTFIDF[token] += 1 / stemmedTokens.length;
		}

		const scores: { [id: string]: number } = {};

		for (const document of userDocuments) {
			let dotProduct = 0;
			let docMagnitude = 0;
			let queryMagnitude = 0;

			for (const token of Object.keys(queryTFIDF)) {
				const tokenValue = document.tfidfData.get(token);

				if (tokenValue) {
					dotProduct += tokenValue * queryTFIDF[token];
					docMagnitude += Math.pow(tokenValue, 2);
					queryMagnitude += Math.pow(queryTFIDF[token], 2);
				}
			}

			if (docMagnitude !== 0 && queryMagnitude !== 0) {
				scores[document.id] =
					dotProduct /
					(Math.sqrt(docMagnitude) * Math.sqrt(queryMagnitude));
			}
		}

		// Filter out documents with score 0 or less
		const filteredScores = Object.entries(scores).filter(
			([_, score]) => score > 0,
		);

		filteredScores.sort((a, b) => b[1] - a[1]);
		const sortedDocumentIDs = filteredScores.map(([id]) => id);

		const topDocs = sortedDocumentIDs.map((id) => {
			const doc = userDocuments.find((document) => document.id === id);

			return {
				doc,
				score: scores[id],
			};
		});

		topDocs.forEach((item: any) => {
			if (item.doc) {
				item.doc.originalDocumentName = `${API_DOCS_URL}${item.doc.originalDocumentName}`;
			}
		});

		return ok({
			data: topDocs,
		});
	},
};
