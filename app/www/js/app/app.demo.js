(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "app/controllers/appController",
		"app/models/account", "app/models/userFile",
		"app/collections/userFiles"
	];

	function app($, _, Backbone, AppController, Account, UserFile, UserFiles) {

		/*
		$.ajax({
			type:"POST",
			url: "/api/accounts/authenticate",
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
			url: "/api/accounts/logout"
		}).then(function(result) {
			console.dir(result);
		});
		*/

		//var appController = new AppController();
		//appController.start();

		/*
		var a = new Account({
			emailAddress: "sarah@training4developers.com",
			password: "test",
			firstName: "Sarah",
			lastName: "Greene"
		});
		a.save(null, {
			success: function(model, response, options) {
				console.dir(model);
				console.dir(response);
				console.dir(options);
			},
			error: function(model, response, options) {
				console.dir(model);
				console.dir(response);
				console.dir(options);
			}
		});
		*/

		/*
		var x = 10;
		while (x--) {
			var userFile = new UserFile({
				name: "file" + x + ".txt",
				sizeinBytes: 10,
				uploaded: new Date(),
				description: "a test file"
			});
			userFile.save(null, {
				success: function(model, response, options) {
					console.dir(model);
					console.dir(response);
					console.dir(options);
				}
			});
		}
		*/

		/*
		var userFiles = new UserFiles();
		userFiles.fetch({
			success: function(model, response, options) {
				model.create({
					name: "file11.txt",
					sizeinBytes: 10,
					uploaded: new Date(),
					description: "a test file"
				}, {
					success: function(model, response, options) {
						console.log("create success");
						console.dir(model);
						console.dir(response);
						console.dir(options);
					}
				});
			}
		});
		console.dir(userFiles);
		*/
		var userFile = new UserFile({
			_id: "55e466beced98640334f6b11"
		});
		userFile.fetch({
			success: function(model, response, options) {
					console.dir(model);
			}
		});



	}

	define(dependencies, app);

})();
