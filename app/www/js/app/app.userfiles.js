(function() {

  var dependencies = [
    "jquery", "underscore",
    "backbone", "app/controllers/appController",
    "app/models/account", "app/models/userFile",
    "app/collections/userFiles"
  ];

  function app($, _, Backbone, AppController, Account, UserFile, UserFiles) {

    var userFiles = new UserFiles();
    userFiles.fetch({
      success: function(collection, response, options) {
        console.log("fetch success");
        console.dir(collection);
        console.dir(response);
        console.dir(options);
      }
    });

    /*
    userFiles.create({
    	name: "testfile.txt",
    	sizeinBytes: 20,
    	uploaded: new Date(),
    	description: "another test file"
    }, {
    	success: function(model, response, options) {
    		console.log("create model");
    		console.dir(model);
    		console.dir(response);
    		console.dir(options);
    		userFiles.fetch({
    			success: function(collection) {
    				console.log("collection fetch");
    				console.dir(collection);
    			}
    		});
    	}
    });
    */

  }

  define(dependencies, app);

})();
