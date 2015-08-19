module.exports = function(grunt) { //function object

  "use strict";

  var
    path = require("path"),
    sassFolder = path.join("assets", "sass"),
    wwwFolder = path.join("app", "www"), //cross platform paths
    cssFolder = path.join(wwwFolder, "css"),
    cssMinFiles = {},
    cssCompressFiles = {},
    sassFiles = {};

  sassFiles[path.join(cssFolder, "site.css")] =
    path.join(sassFolder, "site.scss");

  cssMinFiles[path.join(cssFolder, "site.min.css")] =
    path.join(cssFolder, "site.css");

  cssCompressFiles[path.join(cssFolder, "site.min.gz.css")] =
    path.join(cssFolder, "site.min.css");

  grunt.initConfig({ //Object literal within curly braces
    webServer: {
      port: 8080, //Property value pair
      rootFolder: wwwFolder
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
        tasks: ["sass", "cssmin", "compress:css"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-compress");

  grunt.registerTask("web-server", "start a web server", function() {

    var
      http = require("http"),
      express = require("express"), //express is middleware
      app = express(),
      webServerConfig = grunt.config("webServer");

    //not needed because we are using watch which is async
    //this.async(); //with grunt only 1 async task running

    app.use("/css", express.static(path.join(webServerConfig.rootFolder, "css"), {
      setHeaders: function(res, filePath) {
        res.setHeader("Content-Type", "text/css");
        if (/.gz.css$/.test(filePath)) {
          res.setHeader("Content-Encoding", "gzip");
        }
      }
    }))

    app.use(express.static(webServerConfig.rootFolder));

    http.createServer(app).listen(webServerConfig.port, function() {
      console.log("web server running on port: " + webServerConfig.port);
    });

  });

  grunt.registerTask("default", "start development environment", ["sass", "cssmin", "compress", "web-server", "watch"]);

};
