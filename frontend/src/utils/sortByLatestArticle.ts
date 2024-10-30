import { SearchResult } from "../interfaces/SearchResult";

export const sortByLatestArticle = (data: SearchResult[]) => {
	return data.sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);
};
