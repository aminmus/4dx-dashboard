const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 4000;

const app = express();

app.use(cors());

app.use("/api", require("./routes/nps"));
app.use("/api", require("./routes/clients"));

app.use("/", (_req, res) => {
	res.writeHead(200);
	res.end("Hello, World!\n");
});

app.listen(process.env.SERVER_PORT, () =>
	console.log(`Listening on port ${process.env.SERVER_PORT}!`)
);
