export const prettyPrintDate = (timestamp: string) => {
	const date = new Date(timestamp);
	return date.toLocaleDateString();
};

export const prettyPrintDescription = (text: string) => {
	return text.replace(/<[^>]*>/g, ""); // This removes any HTML tags
};
