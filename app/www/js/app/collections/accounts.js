define(["backbone", "app/models/account"], function(Backbone, Account) {

	return Backbone.Collection.extend({
		model: Account,
		url: "/api/accounts"
	});

});
