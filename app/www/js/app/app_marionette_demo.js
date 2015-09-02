(function() {

	var dependencies = [
		"jquery", "underscore", "backbone", "marionette", "app/app.templates.hbs",
		"app/models/account", "app/collections/accounts"
	];

	function app($, _, Backbone, Marionette, Templates,
		Account, Accounts) {

		Marionette.TemplateCache.prototype.loadTemplate =
			function(templateId, options){
		  	return Templates[templateId];
			};

		Marionette.TemplateCache.prototype.compileTemplate =
			function(rawTemplate, options) {
		  	return rawTemplate;
			};

		Marionette.Renderer.render = function(template, data){
			return Marionette.TemplateCache.get(template)(data);
		};

		var AppLayoutView = Marionette.LayoutView.extend({
			el: "#app",
			template: "appAccountLayout",
			regions: {
				header: "#page-header",
				footer: "#page-footer",
				content: "#content"
			}
		});

		var HeaderView = Marionette.ItemView.extend({
			template: "appAccountHeader"
		});

		var FooterView = Marionette.ItemView.extend({
			template: "appAccountFooter"
		});

		var NoAccountsRowView = Marionette.ItemView.extend({
			template: "noAccountsRow"
		});

		var AccountRowView = Marionette.ItemView.extend({
			tagName: "tr",
			template: "accountRow",
			events: {
				"click [data-action-view-account]": "viewAccount",
				"click [data-action-edit-account]": "editAccount"
			},

			viewAccount: function() {
				console.log("view account: " + this.model.id);
			},

			editAccount: function() {
				console.log("edit account: " + this.model.id);
			}
		});

		var AccountTableView = Marionette.CompositeView.extend({
			template: "accountTable",
			childView: AccountRowView,
			childViewContainer: "tbody"
		});

		function AccountController(app) {

			_.extend(this, Backbone.Events);

			var accounts = new Accounts();

			this.showAccounts = function() {
				accounts.fetch({
					success: function(collection, response, options) {
						app.rootView.getRegion("content").show(new AccountTableView({
							collection: collection
						}));
					}
				});
			};

		}

		var AccountsApp = Marionette.Application.extend({

			initialize: function() {

				var app = this;

				this.on("start", function() {
					app.rootView = new AppLayoutView();
					app.rootView.render();
					app.rootView.getRegion("header").show(new HeaderView());
					app.rootView.getRegion("footer").show(new FooterView());

					app.accountController = new AccountController(app);
					app.accountController.showAccounts();
				});
			}

		});

		$(function() {
			var accountsApp = new AccountsApp();
			accountsApp.start();
		});

	}

	define(dependencies, app);

})();
