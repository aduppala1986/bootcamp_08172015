define(["underscore", "backbone", "app/models/account", "app/views/editAccount"],
	function(_, Backbone, Account, EditAccount) {

		return function() {

			_.extend(this, Backbone.Events);

			var currentView = null;

			this.saveAccount = function(account) {
				console.log("save account")
				console.dir(account);

				model.save(function() {
					this.viewAccount();
				})
			};

			this.viewAccount = function() {

			};

			this.editAccount = function() {
				var myAccount = new Account({
					emailAddress: "eric@training4developers.com",
					password: "wouldn't you like to know",
					firstName: "Eric",
					lastName: "Greene"
				});

				var editAccount = new EditAccount({
					model: myAccount
				});

				this.listenTo(editAccount, "save-account", function(e) {
					this.saveAccount(e);
				});



				$("#app").append(editAccount.render());

				currentView = editAccount;
			}

			this.start = function() {
				this.editAccount();
			}

		};


	});
