import { SearchResult } from "../interfaces/SearchResult";
import { sortByLatestArticle } from "./sortByLatestArticle";

describe("sortByLatestArticle", () => {
	it("should sort articles by date in descending order", () => {
		const articles: SearchResult[] = [
			{
				timestamp: "2023-05-15T10:30:00Z",
				title: "Article 1",
				snippet: "Description 1",
			},
			{
				timestamp: "2023-05-20T14:45:00Z",
				title: "Article 2",
				snippet: "Description 2",
			},
			{
				timestamp: "2023-05-10T08:15:00Z",
				title: "Article 3",
				snippet: "Description 3",
			},
		];

		const sortedArticles = sortByLatestArticle(articles);

		expect(sortedArticles).toEqual([
			{
				timestamp: "2023-05-20T14:45:00Z",
				title: "Article 2",
				snippet: "Description 2",
			},
			{
				timestamp: "2023-05-15T10:30:00Z",
				title: "Article 1",
				snippet: "Description 1",
			},
			{
				timestamp: "2023-05-10T08:15:00Z",
				title: "Article 3",
				snippet: "Description 3",
			},
		]);
	});

	it("should handle articles with the same date", () => {
		const articles = [
			{
				timestamp: "2023-05-15T10:30:00Z",
				title: "Article 1",
				snippet: "Description 1",
			},
			{
				timestamp: "2023-05-10T08:15:00Z",
				title: "Article 2",
				snippet: "Description 2",
			},
			{
				timestamp: "2023-05-15T10:30:00Z",
				title: "Article 3",
				snippet: "Description 3",
			},
		];

		const sortedArticles = sortByLatestArticle(articles);

		expect(sortedArticles).toEqual([
			{
				timestamp: "2023-05-15T10:30:00Z",
				title: "Article 1",
				snippet: "Description 1",
			},
			{
				timestamp: "2023-05-15T10:30:00Z",
				title: "Article 3",
				snippet: "Description 3",
			},
			{
				timestamp: "2023-05-10T08:15:00Z",
				title: "Article 2",
				snippet: "Description 2",
			},
		]);
	});
});
