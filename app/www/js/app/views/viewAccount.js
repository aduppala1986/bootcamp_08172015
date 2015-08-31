(function() {

  var dependencies = [
    "jquery", "handlebars", "underscore",
    "backbone", "app/app.templates.hbs"
  ];

  function viewAccount($, Handlebars, _, Backbone, templates) {

    return Backbone.View.extend({

      id: "account-view",
      tagName: "div",

      events: {
        "click [data-edit-account]": "editAccount",
        "click [data-list-accounts]": "listAccounts"
      },

      editAccount: function() {
        this.trigger("edit-account", this.model);
      },

      listAccounts: function() {
        this.trigger("list-accounts", this.model);
      },

      template: function(model) {
        return templates["viewAccount"](model);
      },

      render: function() {
        this.$el.append(this.template(this.model.toJSON()));
        return this.$el;
      }

    });

  }

  define(dependencies, viewAccount);

})();
