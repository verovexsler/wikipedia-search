require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.BACKEND_PORT;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

// Connect to the database
db.connect((err) => {
	if (err) throw err;
	console.log("Connected to MySQL Database successfuly.");
});

app.get("/search", async (req, res) => {
	const query = req.query.q;
	const timestamp = new Date().toISOString();
	if (!query) {
		return res.status(400).json({ message: 'Query parameter "q" is required' });
	}

	try {
		//get the wikipedia data
		const data = await fetchWikipediaData(query);

		//save search history on success
		await saveSearchHistory(query, timestamp);

		//return the data to the client
		return res.status(201).json(data.query.search);
	} catch (error) {
		console.error("Error fetching data:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

//fetch data from Wikipedia
const fetchWikipediaData = async (query) => {
	const apiUrl = `${process.env.WIKIPEDIA_API}${encodeURIComponent(
		query
	)}&format=json`;
	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error("Failed to fetch data from Wikipedia");
	}
	return response.json();
};

//save to history db
const saveSearchHistory = (query, timestamp) => {
	return new Promise((resolve, reject) => {
		const sql = "INSERT INTO search_history (query, timestamp) VALUES (?, ?)";
		db.execute(sql, [query, timestamp], (err, results) => {
			if (err) {
				console.error("Error inserting data:", err);
				return reject(new Error("Internal server error"));
			}
			resolve(results);
		});
	});
};

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
