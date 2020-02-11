const router = require("express").Router();
const models = require("../../../models");

// GET ALL csat
router.get("/csat", async (_req, res) => {
	try {
		const csat = await models.Csat.findAll();
		console.log(JSON.stringify(csat, null, 2));
		res.send(csat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//GET ONE csat
router.get("/csat/:csatId", async (req, res) => {
	try {
		const csat = await models.Csat.findByPk(req.params.csatId);
		console.log(JSON.stringify(csat, null, 2));
		res.send(csat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//UPDATE csat
router.put("/csat/:csatId", async (req, res) => {
	try {
		const csat = await models.Csat.findByPk(req.params.csatId);
		csat.score = req.body["score"];
		csat.date = req.body["date"];
		await csat.save();
		console.log("csat updated");
		res.send(csat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//POST csat
router.post("/csat", async (req, res) => {
	try {
		const newCsat = await models.Csat.build(req.body);
		console.log(req.body);
		await newCsat.save();
		console.log("new csat saved");
		res.send(newCsat);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

module.exports = router;
