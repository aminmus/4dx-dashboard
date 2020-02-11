const router = require("express").Router();
const models = require("../../models");

// GET ALL CSAT
router.get("/csat", async (req, res) => {
	res.setHeader("Access-Control-Expose-Headers", "Content-Range");
	res.setHeader("Content-Range", "30");
	console.log("*************************");
	console.log("GET ALL REQUEST - CSAT");
	console.log("*************************");
	let filter = {};
	if (req.query.filter) {
		queryFilter = JSON.parse(req.query.filter);
		let ClientId = queryFilter.Client_Id;
		filter = {
			where: { ClientId: ClientId }
		};
	}
	try {
		const csat = await models.Csat.findAll(filter);
		res.send(csat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//GET ONE CSAT
router.get("/csat/:csatId", async (req, res) => {
	console.log("*************************");
	console.log("GET ONE REQUEST - CSAT");
	console.log("*************************");
	try {
		const csat = await models.Csat.findByPk(req.params.csatId);
		res.send(csat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//UPDATE CSAT
router.put("/csat/:csatId", async (req, res) => {
	console.log("*************************");
	console.log("PUT REQUEST - CSAT");
	console.log("*************************");
	try {
		const csat = await models.Csat.findByPk(req.params.csatId);
		csat.score = req.body["score"];
		csat.date = req.body["date"];
		await csat.save();
		res.send(csat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//POST CSAT
router.post("/csat", async (req, res) => {
	console.log("*************************");
	console.log("POST REQUEST - CSAT");
	console.log("*************************");
	try {
		const newCsat = await models.Csat.build(req.body);
		await newCsat.save();
		res.send(newCsat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

// DELETE CSAT
router.delete("/csat/:clientId", async (req, res) => {
	console.log("*************************");
	console.log("DELETE REQUEST - CSAT");
	console.log("*************************");
	try {
		const csat = await models.Csat.findByPk(req.params.clientId);
		await csat.destroy();
		return res.send(csat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

module.exports = router;
