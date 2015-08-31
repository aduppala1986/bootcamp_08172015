(function() {

  var dependencies = [
    "jquery", "underscore",
    "backbone", "app/controllers/appController",
    "app/models/account", "app/models/userFile",
    "app/collections/userFiles"
  ];

  function app($, _, Backbone, AppController, Account, UserFile, UserFiles) {

    var account = new Account({
      _id: "55e481107f918b341a4ab8f1"
    });

    account.fetch({
      success: function(model, response, options) {
        console.log("fetch success");
        console.dir(model);
        console.dir(response);
        console.dir(options);

        model.set("password", "santa and tooth fairy");

        model.save(null, {
          patch: true,
          success: function(model, response, options) {
            console.log("save success");
            console.dir(model);
            console.dir(response);
            console.dir(options);
          },
          error: function(model, response, options) {
            console.log("save error");
            console.dir(model);
            console.dir(response);
            console.dir(options);
          }
        });
      },
      error: function(model, response, options) {
        console.log("fetch error");
        console.dir(model);
        console.dir(response);
        console.dir(options);
      }
    });

    /*
    account.save(null, {
    	success: function(model, response, options) {
    		console.log("success");
    		console.dir(model);
    		console.dir(response);
    		console.dir(options);
    	},
    	error: function(model, response, options) {
    		console.log("error");
    		console.dir(model);
    		console.dir(response);
    		console.dir(options);
    	}
    });
    */

    console.log(account.toJSON());


  }

  define(dependencies, app);

})();
