define(["jquery", "underscore", "backbone"], function($, _, Backbone) {

  $("#message").html("Hello World!");

  var m = new Backbone.Model();

  console.dir(m);

  m.set("firstName", "Miranda");
  m.set("lastName", "Kerr");

  m.on("change", function() {
    console.dir(arguments);
    console.log("first or last name change!");
  });

  m.on("change:lastName", function() {
    console.dir(arguments);
    console.log("last name change!");
  });

  m.set("firstName", "Bob");
  m.set("lastName", "Bieber");

  m.set({
    firstName: "Brad",
    lastName: "Smith"
  });

  console.log(m.get("firstName"));

});
