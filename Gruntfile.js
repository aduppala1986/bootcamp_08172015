module.exports = function(grunt) { //function object

  grunt.initConfig({ //Object literal within curly braces
    webServer: {
      port: 8080, //Property value pair
      rootFolder: "app/www"
    }
  });

  grunt.registerTask("default", "start a web server", function() {

    var
      http = require("http"),
      express = require("express"), //express is middleware
      app = express(),
      webServerConfig = grunt.config("webServer");

    this.async();

    app.use(express.static(webServerConfig.rootFolder));

    http.createServer(app).listen(webServerConfig.port, function() {
      console.log("web server running on port: " + webServerConfig.port);
    });

  });

};
