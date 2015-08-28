define(["backbone"], function(Backbone) {

	return Backbone.extend({

		defaults: {
			name: undefined,
			sizeinBytes: undefined,
			uploaded: undefined,
			description: undefined
		}

		getDownloadUrl: function() {
			return "";
		}

	})

});
