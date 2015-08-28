define(["handlebars"], function(Handlebars) {

  var people = [{
    firstName: "<b>Eric</b>",
    lastName: "Greene"
  }, {
    firstName: "Amy",
    lastName: "Greene"
  }, {
    firstName: "Sarah",
    lastName: "Greene"
  }, {
    firstName: "Natalie",
    lastName: "Greene"
  }];

  var hbs = "{{#list people}}<span>{{firstName}} {{lastName}}</span>{{/list}}";

  Handlebars.registerHelper("list", function(items, options) {

    var tpl = "<ul>";

    items.forEach(function(item) {
      var firstName = new Handlebars.SafeString(item.firstName);
      var lastName = new Handlebars.SafeString(item.lastName);
      tpl += "<li>" + options.fn({
        firstName: firstName,
        lastName: lastName,
      }) + "</li>";
    })

    return tpl + "</ul>";

  });

  var templateFn = Handlebars.compile(hbs);
  console.log(templateFn({
    people: people
  }));

});
