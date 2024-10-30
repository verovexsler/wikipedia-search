import { prettyPrintDate, prettyPrintDescription } from "./prettyPrint";

describe("prettyPrintDate", () => {
	it("should format the date correctly", () => {
		const timestamp = "2023-05-15T10:30:00Z";
		const result = prettyPrintDate(timestamp);

		// Note: The exact output may vary depending on the locale of the system running the test
		// This test assumes a US English locale
		expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
	});

	it("should handle invalid date strings", () => {
		const invalidTimestamp = "not-a-date";
		const result = prettyPrintDate(invalidTimestamp);
		expect(result).toBe("Invalid Date");
	});
});

describe("prettyPrintDescription", () => {
	it("should remove HTML tags from the text", () => {
		const input =
			"<p>This is <strong>bold</strong> and <em>italic</em> text.</p>";
		const expected = "This is bold and italic text.";
		expect(prettyPrintDescription(input)).toBe(expected);
	});

	it("should return the same text if there are no HTML tags", () => {
		const input = "This is plain text without any HTML tags.";
		expect(prettyPrintDescription(input)).toBe(input);
	});

	it("should handle empty string input", () => {
		expect(prettyPrintDescription("")).toBe("");
	});
});
