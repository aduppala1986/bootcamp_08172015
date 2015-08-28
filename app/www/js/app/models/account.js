define(["backbone"], function(Backbone) {

	return Backbone.Model.extend({

		defaults: {
			emailAddress: undefined,
			password: undefined,
			firstName: undefined,
			lastName: undefined
		}

		getName: function() {
			return this.get["firstName"] + " " + this.get["lastName"];
		}

	})


});
