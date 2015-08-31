define(["backbone", "app/models/userFile"], function(Backbone, UserFile) {

	return Backbone.Collection.extend({
		model: UserFile,
		url: "/api/userFiles"
	});

});
