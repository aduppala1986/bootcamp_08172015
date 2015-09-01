(function() {

  var dependencies = [
    "jquery", "underscore",
    "backbone", "marionette", "app/controllers/appController",
    "app/routers/accountRouter", "app/app.templates.hbs",
    "dijit/MenuBar", "dijit/PopupMenuBarItem",
    "dijit/Menu", "dijit/MenuItem", "dijit/DropDownMenu",
  ];

  function app($, _, Backbone, Marionette,
    AppController, AccountRouter, Templates,
    MenuBar, PopupMenuBarItem, Menu, MenuItem, DropDownMenu) {

    //var appController = new AppController(new AccountRouter());
    //appController.start("55e48de10ea7f36020d38989");

    //Backbone.history.start({pushState: true});

    Marionette.TemplateCache.prototype.loadTemplate =
      function(templateId, options) {
        return Templates[templateId];
      };

    Marionette.TemplateCache.prototype.compileTemplate =
      function(rawTemplate, options) {
        return rawTemplate;
      };

    Marionette.Renderer.render = function(template, data) {
      return Marionette.TemplateCache.get(template)(data);
    };

    var AppLayoutView = Marionette.LayoutView.extend({
      el: "#app",
      template: "appAccountLayout",
      regions: {
        header: "#page-header",
        footer: "#page-footer",
        menu: "#menu",
        content: "#content"
      }
    });

    var HeaderView = Marionette.ItemView.extend({
      template: "appAccountHeader"
    });

    var FooterView = Marionette.ItemView.extend({
      template: "appAccountFooter"
    });

    var MenuView = Marionette.ItemView.extend({
      template: "appAccountMenu",
      ui: {
        mainMenuDiv: "#main-menu"
      },
      onRender: function() {

        var pMenuBar = new MenuBar({});

        var pSubMenu = new DropDownMenu({});
        pSubMenu.addChild(new MenuItem({
          label: "File item #1"
        }));
        pSubMenu.addChild(new MenuItem({
          label: "File item #2"
        }));
        pMenuBar.addChild(new PopupMenuBarItem({
          label: "File",
          popup: pSubMenu
        }));

        var pSubMenu2 = new DropDownMenu({});
        pSubMenu2.addChild(new MenuItem({
          label: "Cut",
          iconClass: "dijitEditorIcon dijitEditorIconCut"
        }));
        pSubMenu2.addChild(new MenuItem({
          label: "Copy",
          iconClass: "dijitEditorIcon dijitEditorIconCopy"
        }));
        pSubMenu2.addChild(new MenuItem({
          label: "Paste",
          iconClass: "dijitEditorIcon dijitEditorIconPaste"
        }));
        pMenuBar.addChild(new PopupMenuBarItem({
          label: "Edit",
          popup: pSubMenu2
        }));

        pMenuBar.placeAt(this.ui.mainMenuDiv[0]);
        pMenuBar.startup();
      }
    });

    var AccountsApp = Marionette.Application.extend({

      initialize: function() {

        var app = this;

        this.on("start", function() {
          app.rootView = new AppLayoutView();
          app.rootView.render();
          app.rootView.getRegion("header").show(new HeaderView());
          app.rootView.getRegion("menu").show(new MenuView());
          app.rootView.getRegion("footer").show(new FooterView());
        });
      }

    });

    $(function() {
      var accountsApp = new AccountsApp();
      accountsApp.start();
    });

  }

  define(dependencies, app);

})();
