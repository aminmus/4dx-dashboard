const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("../models");

// Authenticate Connection Database
try {
	db.sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

// Sync Database
try {
	db.sequelize.sync();
	console.error("Sync complete");
} catch (error) {
	console.error("Unable to sync:", error);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/api", require("./routes/client"));
app.use("/api", require("./routes/measure"));
app.use("/api", require("./routes/csat"));
app.use("/api", require("./routes/user"));

app.use("/", (_req, res) => {
	res.writeHead(200);
	res.end("Hello, World!\n");
});

app.listen(process.env.SERVER_PORT, () =>
	console.log(`Listening on port ${process.env.SERVER_PORT}!`)
);
