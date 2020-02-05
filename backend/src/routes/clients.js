const router = require("express").Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var fs = require("fs");
var fileName = "../../data.json";
var data = require(fileName);

// Helper Functions
function updateClient(newClient) {
	const newClientData = data.clients.map(client =>
		client.id === newClient.id ? newClient : client
	);
	data.clients = newClientData;

	try {
		fs.writeFileSync("data.json", JSON.stringify(data, null, 2), "utf8");
	} catch (err) {
		console.log(err);
	}
}

// GET SINGLE CLIENT
router.get("/clients/:id", (_req, res) => {
	res.setHeader("X-Total-Count", "30");
	res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
	res.send(data.clients[_req.params["id"]]);
});

// GET ALL CLIENTS
router.get("/clients", (_req, res) => {
	res.setHeader("X-Total-Count", "30");
	res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
	res.send(data.clients);
});
// UPDATE CLIENT
router.put("/clients/:id", jsonParser, (_req, res) => {
	const client = data.clients[_req.params["id"]];
	console.log(client);
	updateClient(_req.body);
	return res.send(client);
});

module.exports = router;
