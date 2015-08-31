module.exports = function(grunt) {

  "use strict";

  var
    path = require("path"),
    sassFolder = path.join("assets", "sass"),
    wwwFolder = path.join("app", "www"),
    cssFolder = path.join(wwwFolder, "css"),
    jsFolder = path.join(wwwFolder, "js"),
    libsFolder = path.join(wwwFolder, "libs"),
    mediaFolder = path.join(wwwFolder, "libs"),
    imagesFolder = path.join(wwwFolder, "libs"),
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
        mediaFolder: mediaFolder,
        imagesFolder: imagesFolder,
        uploadsFolder: uploadsFolder
      }
    },
    mongoServer: {
      host: "localhost",
      port: 27017,
      dbName: "OnlineFileStorage"
    },
    logger: {
      transports: {
        console: {
          level: "debug",
          colorize: true,
          timeStamp: true
        },
        file: {
          level: "debug",
          fileName: "logs/app.log",
          timeStamp: true
        }
      }
    },
    sass: {
      main: {
        options: {
          sourcemap: "none"
        },
        files: sassFiles
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "handlebars",
          amd: true,
          processName: function(filePath) {
            return path.basename(filePath, ".min.hbs");
          },
          processPartialName: function(filePath) {
            return path.basename(filePath, ".min.hbs");
          }
        },
        files: {
          "app/www/js/app/app.templates.hbs.js": ["assets/templates-min/**/*.min.hbs"]
        }
      }
    },
    jst: {
      compile: {
        options: {
          namespace: "underscore",
          amd: true
        },
        files: {
          "app/www/js/app/app.templates.tpl.js": ["assets/templates-min/**/*.min.tpl"]
        }
      }
    },
    htmlmin: {
      underscore: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: 'assets/templates',
        src: '*.tpl',
        dest: 'assets/templates-min/',
        ext: ".min.tpl"
      },
      handlebars: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: 'assets/templates',
        src: '*.hbs',
        dest: 'assets/templates-min/',
        ext: ".min.hbs"
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
      handlebars: {
        files: ["assets/templates/**/*.hbs"],
        tasks: ["htmlmin:handlebars", "handlebars"],
        options: {
          spawn: false
        }
      },
      underscore: {
        files: ["assets/templates/**/*.tpl"],
        tasks: ["htmlmin:underscore", "jst"],
        options: {
          spawn: false
        }
      },
      css: {
        files: path.join(sassFolder, "**", "*.scss"),
        tasks: ["sass", "cssmin", "compress:css"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-contrib-jst");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-compress");

  grunt.registerTask("web-server", "start a web server", function() {

    require("./app/app")({
      httpServer: grunt.config("httpServer"),
      mongoServer: grunt.config("mongoServer"),
      logger: grunt.config("logger")
    });

  });

  grunt.registerTask("default", "start development environment", ["htmlmin", "handlebars", "jst", "sass", "cssmin",
    "compress", "web-server", "watch"
  ]);

};
