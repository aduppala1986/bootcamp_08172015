define(["jquery", "underscore", "backbone"], function($, _, Backbone) {

  $("#message").html("Hello World!");

  var Person = Backbone.Model.extend({

    defaults: {
      height: 0,
      weight: 0,
      birthday: new Date()
    },

    initialize: function(options) {

      switch (options.homeCountry) {
        case "CN":
          this.set("SFJ", options.nationalId);
          break;
        case "IN":
          this.set("UAID", options.nationalId);
          break;
        case "US":
          this.set("SSN", options.nationalId);
          break;
      }
      delete this.attributes.nationalId;
    },

    getFullName: function() {
      return this.get("firstName") + " " + this.get("lastName");
    }
  });

  var Employee = Person.extend({
    getEmpInfo: function() {
      return this.get("empId") + " " + this.get("lastName") + ", " + this.get("firstName");
    }
  });


  console.dir(Person);

  var p = new Person({
    homeCountry: "CN",
    nationalId: "0123456789ABCDEF",
    firstName: "Brett",
    lastName: "Lee"
  });

  var e = new Employee({
    empId: 1,
    firstName: "Tapasvi",
    lastName: "Moturu"
  });

  console.dir(p);
  console.log(p.getFullName());

  console.dir(e);
  console.log(e.getEmpInfo());


});
