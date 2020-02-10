const router = require("express").Router();
const models = require("../../models");

// GET ALL measureS
router.get("/measures", async (req, res) => {
	try {
		const measures = await models.Measure.findAll();
		console.log(JSON.stringify(measures, null, 2));
		res.send(measures);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//GET ONE measure
router.get("/measures/:measureId", async (req, res) => {
	try {
		const measure = await models.Measure.findByPk(req.params.measureId);
		console.log(JSON.stringify(measure, null, 2));

		res.send(measure);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//UPDATE measure
router.put("/measures/:measureId", async (req, res) => {
	try {
		const measure = await models.Measure.findByPk(req.params.measureId);
		measure.description = req.body["description"];
		measure.success = req.body["success"];
		await measure.save();
		console.log("measure updated");
		res.send(measure);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//POST measure
router.post("/measures", async (req, res) => {
	try {
		const newMeasure = await models.Measure.build(req.body);
		console.log(req.body);
		await newMeasure.save();
		console.log("new measure saved");
		res.send(newMeasure);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

module.exports = router;
