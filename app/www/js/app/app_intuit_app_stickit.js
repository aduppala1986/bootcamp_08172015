(function() {

	var dependencies = [
		"jquery", "underscore", "backbone", "marionette",
		"app/models/account", "app/app.templates.hbs", "stickit"
	];

	function app($, _, Backbone, Marionette,
		Account, templates) {

			function IntuitApplication(options) {

				_.extend(this, Backbone.Events);

				this.$el = options.el;
				this.el = this.$el[0];

				this.addView = function(view) {
					this.$el.append(view.render().$el);
				};

				this.start = function(options) {
					this.trigger("start", options);
				};
			}

			IntuitApplication.BaseView = Backbone.View.extend({

				initialize: function(options) {
					if (options && options.templateName) {
						this.templateName = options.templateName;
					}
				},

				template: function() {
					return templates[this.templateName];
				},

				render: function() {
					this.$el.append(this.template()(this.model.toJSON()));
					this.stickit();
					return this;
				}
			})

			var EditView = IntuitApplication.BaseView.extend({
				templateName: "editView",

				bindings: {
					"#value-edit": {
						observe: "firstName",
						events: ["blur"]
					}
				}
			})

			var SummaryView = IntuitApplication.BaseView.extend({
				templateName: "summaryView",

				bindings: {
					"#summary": "firstName"
				}
			});

			var account = new Account({
				_id: "55df23ea2b88c61794335942"
			});

			account.fetch({
				success: function(originalModel) {

					var editAccount = originalModel.clone();

					editAccount.on("change", function(cloneModel) {
						cloneModel.save(null, {
							success: function() {
								console.log("save clone model");
								originalModel.fetch();
							}
						})
					});

					var summaryView = new SummaryView({
						model: originalModel
					});
					var editView = new EditView({
						model: editAccount
					});

					var app = new IntuitApplication({
						el: $("#app")
					});

					app.on("start", function() {
						app.addView(summaryView);
						app.addView(editView);
					});

					app.start();
				}
			});




	}

	define(dependencies, app);

})();
