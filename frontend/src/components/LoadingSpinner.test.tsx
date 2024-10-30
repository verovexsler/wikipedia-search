import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
	it("renders the loading spinner", () => {
		render(<LoadingSpinner />);

		// Check if the spinner is in the document
		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();

		// Check if the spinner has the correct classes
		expect(spinner).toHaveClass("spinner-border");
		expect(spinner).toHaveClass("text-primary");
	});

	it("has the correct dimensions", () => {
		render(<LoadingSpinner />);

		const spinner = screen.getByRole("status");
		expect(spinner).toHaveStyle({ width: "3rem", height: "3rem" });
	});

	it("displays the loading text", () => {
		render(<LoadingSpinner />);

		const loadingText = screen.getByText("Loading...");
		expect(loadingText).toBeInTheDocument();
		expect(loadingText).toHaveClass("visually-hidden");
	});

	it('displays the "Loading data..." text', () => {
		render(<LoadingSpinner />);

		const loadingDataText = screen.getByText("Loading data...");
		expect(loadingDataText).toBeInTheDocument();
		expect(loadingDataText).toHaveClass("mt-3");
	});
});
