module.exports = function(config) {

	var
		mongoose = require("mongoose"),
		http = require("http"),
		express = require("express"),
		app = express(),
		multer = require("multer"),
		bodyParser = require("body-parser"),
		fs = require("fs"),
		zlib = require("zlib"),
		BufferStream = require("./buffer-stream"),
		contentFolders = config.httpServer.contentFolders;

	// not needed because we are using watch which is async
	//this.async();

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	app.use("/css", express.static(contentFolders.cssFolder, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/css");
			if (/.gz.css$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));

	app.use("/js", express.static(contentFolders.jsFolder, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/javascript");
			if (/.gz.js$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));

	app.use("/libs", express.static(contentFolders.libsFolder));

	app.use("/api", bodyParser.json());

	app.use("/api", multer({ dest: contentFolders.uploadsFolder }).single("upload-file"));

	app.use("/api/upload", function(req, res) {
		res.json({
			message: "upload successful!"
		});
	});

	app.use("/api", require("./routers/rest.js")("user-file"));
	app.use("/api", require("./routers/rest.js")("account"));

	app.use("/", function(req, res) {
		res.sendFile(config.httpServer.indexFile, function(err) {
			if (err) res.status(err.status).end();
		});
	});

	http.createServer(app).listen(config.httpServer.port, function() {
		console.log("web server running on port: " + config.httpServer.port);
	});
};
