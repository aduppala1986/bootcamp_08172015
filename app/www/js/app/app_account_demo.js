(function() {

  var dependencies = [
    "jquery", "underscore",
    "backbone", "app/controllers/appController",
    "app/routers/accountRouter"
  ];

  function app($, _, Backbone, AppController, AccountRouter) {

    //var appController = new AppController(new AccountRouter());
    //appController.start("55e48de10ea7f36020d38989");

    //Backbone.history.start({pushState: true});

    /*
    $.ajax({
    	type:"POST",
    	url: "/api/login",
    	contentType: "application/json",
    	data: JSON.stringify({
    		emailAddress: "eric@training4developers.com",
    		password: "test"
      })
    }).then(function(result) {
    	console.dir(result);
    });
    */

    /*
    $.ajax({
    	type:"GET",
    	url: "/api/logout"
    }).then(function(result) {
    	console.dir(result);
    });
    */
  }

  define(dependencies, app);

})();
