module.exports = function(grunt) {

	"use strict";

	var
		path = require("path"),
		sassFolder = path.join("assets", "sass"),
		wwwFolder = path.join("app", "www"),
		cssFolder = path.join(wwwFolder, "css"),
		jsFolder = path.join(wwwFolder, "js"),
		libsFolder = path.join(wwwFolder, "libs"),
		uploadsFolder = path.join("app", "uploads"),
		indexFile = path.join(__dirname, wwwFolder, "index.html"),
		cssMinFiles = {},
		cssCompressFiles = {},
		sassFiles = {};

	sassFiles[path.join(cssFolder, "site.css")] =
		path.join(sassFolder, "site.scss");

	cssMinFiles[path.join(cssFolder, "site.min.css")] =
		path.join(cssFolder, "site.css");

	cssCompressFiles[path.join(cssFolder, "site.min.gz.css")] =
		path.join(cssFolder, "site.min.css");

	grunt.initConfig({
		httpServer: {
			port: 8080,
			rootFolder: wwwFolder,
			indexFile: indexFile,
			contentFolders: {
				cssFolder: cssFolder,
				jsFolder: jsFolder,
				libsFolder: libsFolder,
				uploadsFolder: uploadsFolder
			}
		},
    mongoServer: {
      host: "localhost",
      port: 27017,
      dbName: "OnlineFileStorage"
    },
    sass: {
			main: {
        options: {
          sourcemap: "none"
        },
				files: sassFiles
			}
		},
		cssmin: {
			main: {
        options: {
          keepSpecialComments: 0,
          sourceMap: false
        },
				files: cssMinFiles
			}
		},
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        files: cssCompressFiles
      }
    },
		watch: {
      css: {
				files: path.join(sassFolder, "**", "*.scss"),
				tasks: ["sass","cssmin","compress:css"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-compress");

	grunt.registerTask("web-server", "start a web server", function() {

		require("./app/app")({
			httpServer: grunt.config("httpServer"),
			mongoServer: grunt.config("mongoServer")
		});

	});

	grunt.registerTask("default", "start development environment",
		[ "sass", "cssmin", "compress", "web-server", "watch" ]);

};
