define(["underscore","handlebars","dojo/dom-construct", "dojo/dom", "jquery"],
	function(_, Handlebars, domConstruct, dom, $) {

		// compile
		var templateFn = _.template("<div>Hi <%- name %>!</div>");
		// one-time data bind
		var html1 = templateFn({ name: "Eric" });
		console.log(html1);

		domConstruct.place(domConstruct.toDom(html1), dom.byId("app"));

		// compile
		var hbsFn = Handlebars.compile("<div>Hi {{name}}!</div>");
		// one-time data bind
		var html2 = hbsFn({ name: "Eric" });
		console.log(html2);

		$("#app").append(html2);

	});
