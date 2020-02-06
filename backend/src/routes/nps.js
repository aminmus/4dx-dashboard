const router = require("express").Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var fs = require("fs");
var fileName = "../../data.json";
var data = require(fileName);

// Helper Functions
function updateNpsOption(newNpsOption) {
	const newNpsData = data.nps.map(nps =>
		nps.id === newNpsOption.id ? newNpsOption : nps
	);
	data.nps = newNpsData;

	try {
		fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8");
	} catch (err) {
		console.log(err);
	}
}

function createNpsOption(newNpsOption) {
	maxId = 0;

	data.nps.map(nps => (nps.id > maxId ? (maxId = nps.id) : maxId++));
	newNpsOption["id"] = maxId;
	data.nps.push(newNpsOption);
	try {
		fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8");
	} catch (err) {
		console.log(err);
	}
}

function deleteNpsOption(npsId) {
	data.nps = data.nps.filter(npsOption => npsOption.id != npsId);
	try {
		fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8");
	} catch (err) {
		console.log(err);
	}
}

// GET ONE NPS OPTION ENTRY
router.get("/nps/:id", (_req, res) => {
	console.log("FETCH ONE REQUEST");
	res.setHeader("X-Total-Count", "30");
	res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
	res.send(data.nps[_req.params["id"]]);
});

// GET ALL NPS OPTIONS
router.get("/nps", (_req, res) => {
	console.log("FETCH ALL REQUEST");
	res.setHeader("X-Total-Count", "30");
	res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
	res.send(data.nps);
});

// UPDATE NPS
router.put("/nps/:id", jsonParser, (_req, res) => {
	console.log("PUT REQUEST");
	const nps = data.nps[_req.params["id"]];
	updateNpsOption(_req.body);
	return res.send(nps);
});

// POST NPS
router.post("/nps", jsonParser, (_req, res) => {
	console.log("POST REQUEST");
	createNpsOption(_req.body);
	return res.send(_req.body);
});

// DELETE NPS
router.delete("/nps/:id", (_req, res) => {
	console.log("DELETE REQUEST");
	const nps = data.nps[_req.params["id"]];
	deleteNpsOption(_req.params["id"]);
	return res.send(nps);
});

module.exports = router;
