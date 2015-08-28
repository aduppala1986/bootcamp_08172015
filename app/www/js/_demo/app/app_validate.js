define(["jquery", "underscore", "backbone"], function($, _, Backbone) {

  $("#message").html("Hello World!");

  var Person = Backbone.Model.extend({

    validate: function(options) {

      console.dir(options);

      if (options.age < 13) {
        console.log("validation failed...");
        return "You are too young to gamble...";
      }
    }

  });

  var p = new Person({
    age: 30
  });

  p.set("age", 40, {
    validate: true
  });

  console.log(p.get("age"));
  console.dir(p.validationError);




});
