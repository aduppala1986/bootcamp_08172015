var
	mongoose = require("mongoose"),

	accountSchema = mongoose.Schema({
		emailAddress: String,
		password: String,
		firstName: String,
		lastName: String
	}),

	AccountModel = mongoose.model("account", accountSchema);

module.exports = AccountModel;
