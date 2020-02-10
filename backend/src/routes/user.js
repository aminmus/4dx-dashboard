const router = require("express").Router();
const models = require("../../models");

// GET ALL USERS
router.get("/users", async (_req, res) => {
	try {
		const users = await models.User.findAll();
		console.log(JSON.stringify(users, null, 2));
		res.send(users);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//GET ONE USER
router.get("/users/:userId", async (req, res) => {
	try {
		const user = await models.User.findByPk(req.params.userId);
		console.log(JSON.stringify(user, null, 2));
		res.send(user);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//UPDATE USER
router.put("/users/:userId", async (req, res) => {
	try {
		const user = await models.User.findByPk(req.params.userId);
		user.email = req.body["email"];
		user.password = req.body["password"];
		await user.save();
		console.log("user updated");
		res.send(user);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

//POST USER
router.post("/users", async (req, res) => {
	try {
		const newUser = await models.User.build(req.body);
		console.log(req.body);
		await newUser.save();
		console.log("new user saved");
		res.send(newUser);
	} catch (err) {
		console.log("ERROR: " + err);
		res.send("error");
	}
});

module.exports = router;
