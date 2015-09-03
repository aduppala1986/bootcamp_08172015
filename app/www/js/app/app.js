(function() {

	var dependencies = [
		"jquery", "underscore", "backbone", "marionette", "app/app.templates.hbs",
		"app/models/account", "app/collections/accounts", "q"
	];

	function app($, _, Backbone, Marionette, Templates,
		Account, Accounts, Q) {

			Marionette.TemplateCache.prototype.loadTemplate =
				function(templateId){
			  	return templateId;
				};

			Marionette.TemplateCache.prototype.compileTemplate =
				function(templateId) {
			  	return Templates[templateId];
				};

			Marionette.Renderer.render = function(templateId, data){
				return Marionette.TemplateCache.get(templateId)(data);
			};

			var AppHeader = Marionette.ItemView.extend({
				template: "appAccountHeader",
				events: {
					"click button": "clickMe"
				},
				clickMe: function() {
					this.trigger("click me", { data: "I was clicked." });
				}
			});

			var AppFooter = Marionette.ItemView.extend({
				template: "appAccountFooter"
			});

			var AppContent = Marionette.ItemView.extend({
				template: "appAccountContent"
			});

			var AccountAppLayout = Marionette.LayoutView.extend({

				initialize: function(options) {

					this.on("render", function() {

						this.getRegion("header").show(new options.views.header());
						this.getRegion("footer").show(new options.views.footer());

					});

				},

				template: "appAccountLayout",
				regions: {
					"header": "#page-header",
					"menu": "#menu",
					"content": "#content",
					"footer": "#page-footer"
				}
			});

			function AccountAppController(app) {

				_.extend(this, Backbone.Events);

				this.showContent = function() {

						var accounts = new Accounts();
						accounts.fetch().then(function(accts) {
							app.views.content = new AppContent({ model: accts.models[0] });
							app.appLayout.getRegion("content").show(app.views.content);
						});

				}

			}

			var AccountApp = Marionette.Application.extend({

				initialize: function(options) {

					this.options = options;

					this.on("start", function() {

						this.appLayout = new AccountAppLayout({
							el: this.options.el,
							views: {
								header: AppHeader,
								footer: AppFooter
							}
						});
						this.appLayout.render();

						this.views = {
							header: this.appLayout.getRegion("header").currentView,
							footer: this.appLayout.getRegion("footer").currentView
						}

						this.accountAppController = new AccountAppController(this);
						this.accountAppController.showContent();

					});
				}

			});

			$(function() {

				var accountApp = new AccountApp({
					el: $("#app")[0]
				});
				accountApp.start();

			});


	}

	define(dependencies, app);

})();
