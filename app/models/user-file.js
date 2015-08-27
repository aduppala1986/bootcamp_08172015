var
	mongoose = require("mongoose"),

	userFileSchema = mongoose.Schema({
		name: String,
		sizeinBytes: Number,
		uploaded: Date,
		description: String
	}),

	UserFileModel = mongoose.model("userFile", userFileSchema);

module.exports = UserFileModel;
