define(["jquery", "underscore", "backbone"], function($, _, Backbone) {

  $("#message").html("Hello World!");

  var Person = Backbone.Model.extend({});

  var People = Backbone.Collection.extend({});

  var people = new People();

  people.add(new Person({
    firstName: "Bob",
    lastName: "Johnson"
  }));

  people.add(new Person({
    firstName: "Suzy",
    lastName: "Carmichael"
  }));

  people.add(new Person({
    firstName: "Stella",
    lastName: "Peters"
  }));

  people.forEach(function(person) {
    console.log(person.get("firstName"));
  });

  console.dir(People);
  console.dir(people);

});
