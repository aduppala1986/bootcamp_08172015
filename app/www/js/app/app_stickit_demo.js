(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "marionette", "app/controllers/appController",
		"app/routers/accountRouter", "app/app.templates.hbs", "stickit"
	];

	function app($, _, Backbone, Marionette,
		AppController, AccountRouter, templates) {

		String.prototype.ucfirst = function() {
    	return this.charAt(0).toUpperCase() + this.slice(1);
		};

		//var appController = new AppController(new AccountRouter());
		//appController.start("55e48de10ea7f36020d38989");

		//Backbone.history.start({pushState: true});

		var SampleModel = Backbone.Model.extend({});

		var States = Backbone.Collection.extend({});

		var SampleView = Backbone.View.extend({

			initialize: function(options) {
				this.options = options
			},

			getOptionsGroup: function(collection, attrName) {
				optGroups = _.uniq(collection.pluck(attrName)).sort().map(function(optGroupCode) {
					return {
						optGroupCode: optGroupCode,
						optGroupLabel: optGroupCode.ucfirst()
					}
				});
				optGroupLabels = _.map(optGroups, function(optGroup) {
					return optGroup.optGroupLabel;
				});

				var options = {
					"opt_labels": optGroupLabels
				};

				optGroups.forEach(function(optGroup) {
						var filter = {};
						filter[attrName] = optGroup.optGroupCode;
						options[optGroup.optGroupLabel] =
							collection.where(filter).map(function(model) {
								return model.toJSON();
							}).sort();
				});

				return options;
			},

			bindings: {
				"h1": {
					observe: "pageHeader",
					onGet: function(value) {
						return value.toUpperCase();
					}
				},
				"#input-text-example": "inputTextExample",
				"#input-text-example-edit": {
						observe: "inputTextExample",
						//events: ['blur'],
						onGet: function(value) {
							console.log("get: " + value);
							return value;
						},
						onSet: function(value) {
							console.log("set: " + value);
							return value;
						}
				},
				"#input-checkbox-example": {
					observe: "inputCheckboxExample",
					onGet: function(value) {
						return value ? "Checked" : "Not Checked";
					}
				},
				"#input-checkbox-example-edit": "inputCheckboxExample",
				"#input-radio-example": "inputRadioExample",
				"[name=input-radio-example-edit]": "inputRadioExample",
				"#select-example": "selectExample",
				"#select-example-edit": {
					observe: "selectExample",
					selectOptions: {
						collection: function() {
							return this.getOptionsGroup(this.options.states, "color");
						},
						labelPath: "name",
						valuePath: "code",
						defaultOptions: {
							label: "Select One...",
							value: null
						}
					}
				},
				"#textarea-example": "textareaExample",
				"#textarea-example-edit": "textareaExample"
			},

			template: function() {
				return templates["appSample"];
			},

			render: function() {
				this.$el.append(this.template()(this.model.toJSON()));
				//this.addBinding(null, "h1", { observe: "pageHeader" });
				this.stickit();
				return this;
			}

		});

		var sampleModel = new SampleModel({
			pageHeader: "StickIt Examples",
			inputTextExample: "Sample Text...",
			inputCheckboxExample: true,
			inputRadioExample: "blue",
			selectExample: "NY",
			textareaExample: "Some comments..."
		});

		var states = new States([
			{ name: "California", code: "CA", color:"blue" },
			{ name: "New York", code: "NY", color:"blue" },
			{ name: "Virginia", code: "VA", color:"purple" },
			{ name: "Ohio", code: "OH", color:"purple" },
			{ name: "Oklahoma", code: "OK", color:"red" },
			{ name: "Texas", code: "TX", color:"red" }
		]);

		var sampleView = new SampleView({
			model: sampleModel,
			states: states
		});

		$("#app").append(sampleView.render().$el);
	}

	define(dependencies, app);

})();
