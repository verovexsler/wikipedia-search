import Search from "./components/Search";

const App = () => {
	const fetchResults = async (query) => {
		try {
			const response = await fetch(
				`http://localhost:${
					process.env.REACT_APP_BACKEND_PORT
				}/search?q=${encodeURIComponent(query)}`
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return await response.json();
		} catch (error) {
			console.error("Error fetching results:", error);
			return [];
		}
	};

	return <Search fetchResults={fetchResults} />;
};

export default App;
