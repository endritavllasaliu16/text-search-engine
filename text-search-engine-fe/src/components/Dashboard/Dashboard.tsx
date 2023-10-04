import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Container from "../Container/Container";
import { API_BASE_URL } from "../../config/api";
import { useDocumentContext } from "../../context/DocumentContext";
import "./Dashboard.css";
import Search from "../Search/Search";

type Document = {
	title: string;
	url: string;
};

const Dashboard: React.FC = () => {
	const [resetSearch, setResetSearch] = useState<boolean>(false);
	const { triggerReload, setTriggerReload } = useDocumentContext();
	const [localDocuments, setLocalDocuments] = useState<Document[]>([]);
	const [hasSearchResults, setHasSearchResults] = useState<boolean>(true);

	const fetchDocuments = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) throw new Error("No authentication token found");

		const response = await fetch(`${API_BASE_URL}/upload`, {
			method: "GET",
			headers: new Headers({
				Authorization: `Bearer ${token}`,
			}),
		});

		if (!response.ok) throw new Error("Failed to fetch documents");
		const result = await response.json();
		setLocalDocuments([]);
		setLocalDocuments(
			result.data.map((doc: any) => ({
				title: doc.documentName,
				url: doc.originalDocumentName,
			})),
		);
	};

	const handleTitleClick = () => {
		setHasSearchResults(true);
		setResetSearch(true);
		setTimeout(() => setResetSearch(false), 100);
		setLocalDocuments([]);
		fetchDocuments();
	};

	useEffect(() => {
		fetchDocuments().catch((error) => console.log("Fetch error:", error));
		setTriggerReload(false);
	}, [triggerReload, setTriggerReload]);

	const handleEmptySearch = fetchDocuments;

	const handleSearchResults = (results: any[]) => {
		setLocalDocuments([]);

		const processedData =
			results.length > 0 && results[0].hasOwnProperty("doc")
				? results.map((item) => item.doc)
				: results;

		setLocalDocuments((prevDocs) => [
			...prevDocs,
			...processedData.map((doc) => ({
				title: doc.documentName,
				url: doc.originalDocumentName,
			})),
		]);
	};

	const renderDocumentGrid = () => {
		if (localDocuments.length > 0) {
			return localDocuments.map((doc: Document) => (
				<div key={doc.url} className='pdf-card'>
					<a href={doc.url} target='_blank' rel='noopener noreferrer'>
						<div className='pdf-preview'>
							<img src='/pngegg.png' alt={doc.title} />
						</div>
						<div className='pdf-title'>{doc.title}</div>
					</a>
				</div>
			));
		}
		if (!hasSearchResults) {
			return <div className='no-results'>No results were found!</div>;
		}
		return (
			<div className='no-results'>
				You have no documents, please use upload to get started!
			</div>
		);
	};

	return (
		<div className='dashboard'>
			<Header onTitleClick={handleTitleClick} />
			<Container>
				<main>
					<div className='header-wrapper'>
						<h1>Documents</h1>
						<Search
							onSearchResults={handleSearchResults}
							shouldReset={resetSearch}
							onEmptySearch={handleEmptySearch}
							onSearchStatus={setHasSearchResults}
						/>
					</div>
					<div className='document-grid'>{renderDocumentGrid()}</div>
				</main>
			</Container>
		</div>
	);
};

export default Dashboard;
