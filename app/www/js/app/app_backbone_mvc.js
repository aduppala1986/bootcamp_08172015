(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "app/controllers/appController",
		 "app/routers/accountRouter"
	];

	function app($, _, Backbone, AppController, AccountRouter) {

		var appController = new AppController(new AccountRouter());
		//appController.start("55e48de10ea7f36020d38989");

		Backbone.history.start({pushState: true});
	}

	define(dependencies, app);

})();
