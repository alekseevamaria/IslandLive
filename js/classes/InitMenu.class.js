var InitMenu = Base.extend({
    constructor: function()
    {
        $("#" + InitMenu.id.FILE_MENU_BTTN).on(InitMenu.event.CLICK, handler(this, "_show"));
        $("#" + InitMenu.id.MAIN_MENU_BTTN).on(InitMenu.event.CLICK, handler(this, "_show"));
        $("#" + InitMenu.id.FILTER_MENU_BTTN).on(InitMenu.event.CLICK, handler(this, "_show"));
        document.getElementById(InitMenu.id.MAIN_MENU_BTTN).click();
    },
    
    _show: function(e)
    {
        $("#" + InitMenu.id.FILE_MENU).hide();
        $("#" + InitMenu.id.MAIN_MENU).hide();
        $("#" + InitMenu.id.FILTER_MENU).hide();
        var id = e.target.id;
        if (id == InitMenu.id.FILTER_MENU_BTTN)
        {
            $("#" + InitMenu.id.FILTER_MENU).show();
        }
        else if (id ==  InitMenu.id.FILE_MENU_BTTN)
        {        
            $("#" + InitMenu.id.FILE_MENU).show();
        }
        else if (id == InitMenu.id.MAIN_MENU_BTTN)
        {
            $("#" + InitMenu.id.MAIN_MENU).show();
        }
    }
    
}, {
    id:
    {
        FILE_MENU_BTTN: "fileMenuBtn",
        MAIN_MENU_BTTN: "mainMenuBtn",
        FILTER_MENU_BTTN: "filterMenuBtn",
        FILE_MENU: "fileMenu",
        MAIN_MENU: "mainMenu",
        FILTER_MENU: "filterMenu"
    },
    
    event:
    {
        CLICK: "click"
    },
});