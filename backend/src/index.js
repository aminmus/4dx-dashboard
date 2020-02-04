const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

app.use(cors());

app.use("/api", require("./routes/nps"));
app.use("/api", require("./routes/clients"));

app.use("/", (_req, res) => {
	res.writeHead(200);
	res.end("Hello, World!\n");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
