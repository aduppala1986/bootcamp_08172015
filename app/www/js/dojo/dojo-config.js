var dojoConfig = {
	async: true,
	packages: [
		{ name: "app", location: "../../js/app" },
		{ name: "jquery", location: "../jquery/dist", main: "jquery" },
		{ name: "q", location: "../q", main: "q" },
		{ name: "handlebars", location: "../handlebars", main: "handlebars" },
		{ name: "underscore", location: "../underscore", main: "underscore" },
		{ name: "backbone", location: "../backbone", main: "backbone" },
		{ name: "stickit", location: "../backbone.stickit", main: "backbone.stickit" },
		{ name: "marionette", location: "../backbone.marionette/lib", main: "backbone.marionette" }
	]
};
