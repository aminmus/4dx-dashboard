const router = require("express").Router();

const data = require("../../data.json");

router.get("/nps", (_req, res) => {
	res.setHeader("X-Total-Count", "30");
	res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
	res.send(data.nps);
});

module.exports = router;
