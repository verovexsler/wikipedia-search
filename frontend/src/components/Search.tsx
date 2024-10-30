import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Search.css";
import ResultCards from "./ResultCards";
import { SearchResult } from "../interfaces/SearchResult";
import { sortByLatestArticle } from "../utils/sortByLatestArticle";

interface SearchProps {
	fetchResults: (query: string) => Promise<SearchResult[]>;
}

const Search: React.FC<SearchProps> = ({ fetchResults }) => {
	const [query, setQuery] = useState<string>("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [hideCards, setHideCards] = useState<boolean>(true);

	const handleSearch = async () => {
		setHideCards(false);
		setLoading(true);
		const data = await fetchResults(query);
		//sort by latest article for better UX
		setResults(sortByLatestArticle(data));
		setLoading(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!query.trim() || event.key !== "Enter") return;
		handleSearch();
	};

	return (
		<div className="container mt-4">
			<figure className="text-center">
				<h1 className="text-shadow-glow">Looking for something?</h1>
			</figure>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Search..."
					value={query}
					onKeyDown={handleKeyDown}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button
					className="btn btn-primary"
					onClick={handleSearch}
					disabled={loading || !query.trim()}
				>
					{loading ? "Searching..." : "Search"}
				</button>
			</div>

			{!hideCards && <ResultCards results={results} loading={loading} />}
		</div>
	);
};

export default Search;
