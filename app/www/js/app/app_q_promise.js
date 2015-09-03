(function() {

	var dependencies = [
		"jquery", "underscore", "backbone", "marionette", "app/app.templates.hbs",
		"app/models/account", "app/collections/accounts", "q"
	];

	function app($, _, Backbone, Marionette, Templates,
		Account, Accounts, Q) {

			var olderLady = Q.defer();
			var olderMan = olderLady.promise;

			olderMan.then(function() {
				console.log("Q Promise - she said yes!");
			}, function() {
				console.log("Q Promise - she said no!");
			});

			setTimeout(function() {
				olderLady.resolve();
			},3000);

			var youngMan = new Promise(function(resolve, reject) {

				setTimeout(function() {
					resolve();
				},6000);

			});

			youngMan.then(function() {
				console.log("ES6 Promise - she said yes!");
			}).then(function() {
				console.log("ES6 Promise - she said yes!");
			}).then(function() {
				console.log("ES6 Promise - she said yes!");
			}).then(function() {
				console.log("ES6 Promise - she said yes!");
			}).then(function() {
				console.log("ES6 Promise - she said yes!");
			}).catch(function() {
				console.log("ES6 Promise - she said no!");
			})
			.finally(function() {

			});

			try {

			} catch(e) {

			}


	}

	define(dependencies, app);

})();
