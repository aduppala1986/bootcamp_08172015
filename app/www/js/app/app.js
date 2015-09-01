(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "marionette", "app/controllers/appController",
		"app/routers/accountRouter", "app/app.templates.hbs"
	];

	function app($, _, Backbone, Marionette,
		AppController, AccountRouter, templates) {

		//var appController = new AppController(new AccountRouter());
		//appController.start("55e48de10ea7f36020d38989");

		//Backbone.history.start({pushState: true});

	}

	define(dependencies, app);

})();
