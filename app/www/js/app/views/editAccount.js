(function() {

  var dependencies = [
    "jquery", "handlebars", "underscore",
    "backbone", "app/app.templates.hbs"
  ];

  function editAccount($, Handlebars, _, Backbone, templates) {

    return Backbone.View.extend({

      id: "account-edit",
      tagName: "div",

      events: {
        "click [data-save-account]": "saveAccount",
        "click [data-view-account]": "viewAccount",
        "click [data-delete-account]": "deleteAccount"
      },

      saveAccount: function() {
        this.trigger("save-account", {
          _id: this.model.id,
          emailAddress: $("#emailAddress").val(),
          password: $("#password").val(),
          firstName: $("#firstName").val(),
          lastName: $("#lastName").val(),
        });
      },

      viewAccount: function() {
        this.trigger("view-account", this.model);
      },

      deleteAccount: function() {
        if (confirm("Are you sure you want to delete this account?")) {
          this.trigger("delete-account", this.model);
        }
      },

      template: function(model) {
        return templates["editAccount"](model);
      },

      render: function() {
        this.$el.append(this.template(this.model.toJSON()));
        return this.$el;
      }

    });

  }

  define(dependencies, editAccount);

})();
