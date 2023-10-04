import React, { useEffect, useState } from "react";
import "./Search.css";
import { API_BASE_URL } from "../../config/api";

type SearchProps = {
	onSearchResults: (results: any[]) => void;
	shouldReset: boolean;
	onEmptySearch: () => void;
	onSearchStatus: (hasResults: boolean) => void;
};

const Search: React.FC<SearchProps> = ({
	onSearchResults,
	shouldReset,
	onEmptySearch,
	onSearchStatus,
}) => {
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		if (shouldReset) setSearchValue("");
	}, [shouldReset]);

	const getToken = () => localStorage.getItem("authToken");

	const searchDocuments = async (query: string) => {
		const token = getToken();
		if (!token) {
			console.error("No authentication token found");
			return null;
		}

		const response = await fetch(`${API_BASE_URL}/search/${query}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(
				`Failed to fetch documents. Status: ${response.status}`,
			);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!searchValue) {
			onEmptySearch();
			return;
		}

		try {
			const data = await searchDocuments(searchValue);

			if (data && data.data) {
				const hasResults = data.data.length > 0;
				onSearchStatus(hasResults);
				onSearchResults(hasResults ? data.data : []);
				console.log("Received search results:", data.data);
			} else {
				console.warn("Unexpected data structure received:", data);
				onSearchStatus(false);
				onSearchResults([]);
			}
		} catch (error) {
			console.error("Search error:", error);
		}
	};

	return (
		<div className='search-container'>
			<form className='search' onSubmit={handleSearch}>
				<input
					type='search'
					placeholder='Search here...'
					value={searchValue}
					onChange={handleInputChange}
					required
				/>
				<button type='submit'>Search</button>
			</form>
		</div>
	);
};

export default Search;
