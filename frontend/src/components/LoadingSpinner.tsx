const LoadingSpinner = () => {
	return (
		<div
			className="d-flex align-items-center justify-content-center"
			style={{ height: "50vh" }}
		>
			<div className="text-center">
				<div
					className="spinner-border text-primary"
					role="status"
					style={{ width: "3rem", height: "3rem" }}
				>
					<span className="visually-hidden">Loading...</span>
				</div>
				<p className="mt-3">Loading data...</p>
			</div>
		</div>
	);
};

export default LoadingSpinner;
