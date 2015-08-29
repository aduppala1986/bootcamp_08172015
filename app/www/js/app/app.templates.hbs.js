define(['handlebars'], function(Handlebars) {

this["handlebars"] = this["handlebars"] || {};

this["handlebars"]["editAccount"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<form><div><label for=\"firstName\">First Name:</label><input id=\"firstName\" name=\"firstName\" value=\""
    + alias3(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstName","hash":{},"data":data}) : helper)))
    + "\"></div><div><label for=\"lastName\">Last Name:</label><input id=\"lastName\" name=\"lastName\" value=\""
    + alias3(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "\"></div><button type=\"button\">Save Account</button></form>";
},"useData":true});

this["handlebars"]["home"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div>HBS Welcome "
    + ((stack1 = ((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "! <button class=\"ok\">Ok!</button></div>";
},"useData":true});

return this["handlebars"];

});