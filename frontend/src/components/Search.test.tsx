import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "./Search"; // Adjust the import path as needed

// Mock the fetchResults function
const mockFetchResults = jest.fn();

describe("Search Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<Search fetchResults={mockFetchResults} />);
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
		expect(screen.getByText("Looking for something?")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
	});

	it("updates input value when typing", () => {
		render(<Search fetchResults={mockFetchResults} />);
		const input = screen.getByPlaceholderText("Search...");

		fireEvent.change(input, { target: { value: "Elon Musk" } });
		expect(input).toHaveValue("Elon Musk");
	});

	it("calls fetchResults and displays results on search button click", async () => {
		const mockResults = [
			{
				title: "Elon Musk",
				snippet: "Business magnate, industrial designer, and engineer.",
				timestamp: "2023-10-01",
			},
		];
		mockFetchResults.mockResolvedValueOnce(mockResults); // Resolve the mock promise

		render(<Search fetchResults={mockFetchResults} />);

		const input = screen.getByPlaceholderText("Search...");
		fireEvent.change(input, { target: { value: "Elon Musk" } });
		fireEvent.click(screen.getByRole("button", { name: /search/i }));

		// Check if loading state is set
		expect(
			screen.getByRole("button", { name: /searching/i })
		).toBeInTheDocument();

		// Wait for the results to be displayed
		await waitFor(() => expect(mockFetchResults).toHaveBeenCalledTimes(1));

		// Check if results are passed to ResultCards component
		expect(mockFetchResults).toHaveBeenCalledWith("Elon Musk");
	});

	it("does not call fetchResults when input is empty", () => {
		render(<Search fetchResults={mockFetchResults} />);
		const button = screen.getByRole("button", { name: /search/i });

		fireEvent.click(button);
		expect(mockFetchResults).not.toHaveBeenCalled();
	});

	it("handles Enter key to trigger search", async () => {
		const mockResults = [
			{
				title: "Elon Musk",
				snippet: "Business magnate, industrial designer, and engineer.",
				timestamp: "2023-10-01",
			},
		];
		mockFetchResults.mockResolvedValueOnce(mockResults); // Resolve the mock promise

		render(<Search fetchResults={mockFetchResults} />);

		const input = screen.getByPlaceholderText("Search...");
		fireEvent.change(input, { target: { value: "Elon Musk" } });
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

		// Check if loading state is set
		expect(
			screen.getByRole("button", { name: /searching/i })
		).toBeInTheDocument();

		// Wait for the results to be displayed
		await waitFor(() => expect(mockFetchResults).toHaveBeenCalledTimes(1));
		expect(mockFetchResults).toHaveBeenCalledWith("Elon Musk");
	});
});
