(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "app/controllers/appController"
	];

	function app($, _, Backbone, AppController) {

		var appController = new AppController();
		appController.start();
	}

	define(dependencies, app);

})();
