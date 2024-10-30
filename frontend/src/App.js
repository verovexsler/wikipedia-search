import Search from "./components/Search";
import useFetchResults from "./hooks/useFetchResults";

const App = () => {
	const fetchResults = useFetchResults();

	return <Search fetchResults={fetchResults} />;
};

export default App;
