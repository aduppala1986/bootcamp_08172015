var
	express = require("express"),
	router = express.Router();

router.use("/api", function(req, res, next) {

	logger.info("beginning validation");

	// validate if a user is logged in
	if (!req.user) {
		res.status(401).end();
		return;
	}

	logger.info("user is logged in");

	next();
});

module.exports = router;
