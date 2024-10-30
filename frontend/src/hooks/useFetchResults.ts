import { useCallback } from "react";
import { SearchResult } from "../interfaces/SearchResult";

type FetchResults = (query: string) => Promise<SearchResult[]>;

const useFetchResults = (): FetchResults => {
	const fetchResults: FetchResults = useCallback(async (query) => {
		try {
			const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return (await response.json()) as SearchResult[];
		} catch (error) {
			console.error("Error fetching results:", error);
			return [];
		}
	}, []);

	return fetchResults;
};

export default useFetchResults;
