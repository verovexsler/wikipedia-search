import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

// Mock implementation of fetchResults
const mockFetchResults = jest.fn();

mockFetchResults.mockResolvedValue([
	{
		timestamp: "2024-01-01T00:00:00Z",
		title: "Example Title 1",
		snippet: "Example snippet 1",
	},
	{
		timestamp: "2024-01-02T00:00:00Z",
		title: "Example Title 2",
		snippet: "Example snippet 2",
	},
]);

describe("Search", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the search input and button", () => {
		render(<Search fetchResults={mockFetchResults} />);

		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
	});

	it("does not show results if the search term is empty", async () => {
		render(<Search fetchResults={mockFetchResults} />);

		const searchButton = screen.getByRole("button", { name: "Search" });

		fireEvent.click(searchButton);
		expect(screen.queryByText("No results found.")).not.toBeInTheDocument();
	});
});
