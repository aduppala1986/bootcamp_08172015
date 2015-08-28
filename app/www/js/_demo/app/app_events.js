define(["jquery", "underscore", "backbone"], function($, _, Backbone) {

  var cookieCount = 0;

  $("#message").html("Hello World!");

  function areThereCookies() {
    return cookieCount > 0;
  }

  var foodie = {
    firstName: "Carl",
    lastName: "Jr."
  };

  _.extend(foodie, Backbone.Events);

  foodie.on("delivery", function(numOfCookies, secondValue) {
    console.dir(arguments);
    cookieCount += numOfCookies;
    console.log("push the cart over, unload the food (cookies: " + numOfCookies + "), and leave");
  });


  var coder = {
    firstName: "Eric",
    lastName: "Greene",
    writeLotsOfCode: function() {
      console.log("writing lots of code");
      this.trigger("hungry");
    }
  };

  _.extend(coder, Backbone.Events);

  coder.on("hungry", function() {
    console.log("get up, walk to table, get cookie");
    if (areThereCookies()) {
      console.log("lots of cookies");
      this.trigger("happiness");
    } else {
      console.log("no cookies");
      this.trigger("sadness");
    }
  });

  function happiness() {
    console.log("dance with my keyboard");
  }

  coder.on("happiness", happiness);
  //coder.off("happiness", happiness);

  coder.on("sadness", function() {
    console.log("cry on my keyboard");
  });

  coder.listenTo(foodie, "delivery", function() {
    coder.writeLotsOfCode();
  });


  foodie.trigger("delivery", 5, "Hi!");





});
