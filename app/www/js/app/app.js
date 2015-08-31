(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "app/controllers/appController",
		"app/models/account", "app/models/userFile",
		"app/collections/userFiles"
	];

	function app($, _, Backbone, AppController, Account, UserFile, UserFiles) {


	}

	define(dependencies, app);

})();
