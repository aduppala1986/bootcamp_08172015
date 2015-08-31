var
	mongoose = require("mongoose"),
	express = require("express"),
	crypto = require("crypto"),
	validator = require("validator"),
	AccountModel = require("../models/account.js"),
	router = express.Router();

router.route("/api/accounts/logout").all(function(req, res, next) {

	if (req.session) {
		req.session.destroy(function() {
			next();
		});
	}

});

router.route("/api/accounts/authenticate").post(function(req, res) {

	var
		salt = "salt rocks!",
		saltedPassword = crypto.createHash("sha1")
		.update(req.body.password.toString() + salt).digest("hex");

	logger.info("authenticate called");
	logger.info("email address: " + req.body.emailAddress);
	logger.info("salted password: " + saltedPassword);

	if (!validator.isEmail(req.body.emailAddress)) {
		logger.info("email address failed");
		return res.status(401).end();
	}

	saltedPassword = req.body.password.toString();

	AccountModel.findOne({
		emailAddress: req.body.emailAddress,
		password: saltedPassword
	}, function(err, account) {

		if (err || !account) return res.status(401).end();

		logger.info("account found");

		// convert mongo document to plain object, the process login
		account = account.toObject();
		req.login(account, function(err) {

			if (err) return res.status(500).json(err);

			logger.info("login processed");
			res.json(account);

		});

	});

});

module.exports = router;
