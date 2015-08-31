define(["backbone"], function(Backbone) {

	return Backbone.Model.extend({

		idAttribute: "_id",
		urlRoot: "/api/userFiles",

		defaults: {
			name: undefined,
			sizeinBytes: undefined,
			uploaded: undefined,
			description: undefined
		},

		getDownloadUrl: function() {
			return "";
		}

	});

});
