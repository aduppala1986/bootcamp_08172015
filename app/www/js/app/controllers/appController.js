define(["underscore", "backbone", "app/models/account",
    "app/views/editAccount", "app/views/viewAccount"
  ],
  function(_, Backbone, Account, EditAccount, ViewAccount) {

    return function(router) {

      _.extend(this, Backbone.Events);

      var currentView = null;
      var controller = this;

      function fetchAccount(accountId, cb) {
        var account = new Account({
          _id: accountId
        });
        account.fetch({
          success: function(model, response, options) {
            cb(model);
          }
        });
      }

      controller.listenTo(router, "view-account", function(accountId) {
        fetchAccount(accountId, controller.viewAccount);
      });

      controller.listenTo(router, "edit-account", function(accountId) {
        fetchAccount(accountId, controller.editAccount);
      });

      this.listAccounts = function() {
        console.log("list accounts");
      }

      this.deleteAccount = function(account) {
        account.destroy({
          success: function(model, response, options) {
            this.listAccounts();
          }
        });
      }

      this.saveAccount = function(account) {

        var account = new Account(account);

        account.save(null, {
          success: function(model, response, options) {
            console.log("account saved");
            console.dir(model);
            controller.viewAccount(model);
          },
          error: function(model, response, options) {
            console.log("account not saved");
          }
        });
      };

      this.viewAccount = function(model) {

        if (currentView) {
          currentView.remove();
        }

        currentView = new ViewAccount({
          model: model
        });

        controller.listenTo(currentView, "edit-account", function(accountModel) {
          this.editAccount(accountModel);
        });

        controller.listenTo(currentView, "list-accounts", function(accountModel) {
          this.listAccounts();
        });

        $("#app").append(currentView.render());

        router.navigate("/accounts/" +
          encodeURIComponent(model.id));
      };

      this.editAccount = function(model) {

        if (currentView) {
          currentView.remove();
        }

        currentView = new EditAccount({
          model: model
        });

        controller.listenTo(currentView, "save-account", function(accountAttributes) {
          this.saveAccount(accountAttributes);
        });

        controller.listenTo(currentView, "delete-account", function(accountModel) {
          this.deleteAccount(accountModel);
        });

        controller.listenTo(currentView, "view-account", function(accountModel) {
          this.viewAccount(accountModel);
        });

        $("#app").append(currentView.render());

        router.navigate("/accounts/" +
          encodeURIComponent(model.id) + "/edit");
      }

      this.start = function() {

        this.listAccounts();

      };

    };


  });
