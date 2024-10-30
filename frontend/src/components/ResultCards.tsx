import { prettyPrintDate, prettyPrintDescription } from "../utils/prettyPrint";
import { SearchResult } from "../interfaces/SearchResult";
import LoadingSpinner from "./LoadingSpinner";

interface ResultCardsProps {
	results: SearchResult[];
	loading?: boolean;
}

const ResultCards = (props: ResultCardsProps) => {
	const { results, loading } = props;

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="row">
			{results.length > 0 ? (
				results.map((result, index) => (
					<div key={index} className="col-md-4 mb-3 d-flex flex-column">
						<div className="card shadow-sm flex-fill">
							<div className="card-body d-flex flex-column">
								<h4 className="card-title">{result.title}</h4>
								<p className="card-text">
									{prettyPrintDescription(result.snippet)}
								</p>
								<p className="card-text mt-auto">
									Created: {prettyPrintDate(result.timestamp)}
								</p>
							</div>
						</div>
					</div>
				))
			) : (
				<p className="text-center">No results found.</p>
			)}
		</div>
	);
};

export default ResultCards;
