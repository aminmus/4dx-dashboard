const router = require("express").Router();
const db = require("../../../models/client.js");

const Client = db.sequelize.import("../../models/client");
const Measure = db.sequelize.import("../../models/measure");

router.get("/clients", async (_req, res) => {
	const client = await Client.findAll({
		include: [
			{
				model: Measure
			}
		]
	});
	res.send(client);
});

module.exports = router;
