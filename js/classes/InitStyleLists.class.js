var InitStyleLists = Base.extend({
    _graphic: null,
    
    constructor: function(graphic)
    {
        this._graphic = graphic;
        this._initLineWidthListListeners(graphic);       
        this._initStrokeListeners(graphic);
        this._initFillListeners(graphic);
        
        $("#" + InitStyleLists.id.STROKE_BTTN).on(Graphic.event.CLICK, handler(this, "_showSubList"));
        $("#" + InitStyleLists.id.FILL_BTTN).on(Graphic.event.CLICK, handler(this, "_showSubList"));  
        $("#" + InitStyleLists.id.LINE_WIDTH_BTTN).on(Graphic.event.CLICK, handler(this, "_showSubList"));
        
        $("#" + InitStyleLists.id.STROKE_BTTN).children().on(Graphic.event.CLICK, handler(this, "_showSubList"));
        $("#" + InitStyleLists.id.FILL_BTTN).children().on(Graphic.event.CLICK, handler(this, "_showSubList"));  
        $("#" + InitStyleLists.id.LINE_WIDTH_BTTN).children().on(Graphic.event.CLICK, handler(this, "_showSubList"));
        this._hideSubLists();
        
        $(document).on(Graphic.event.CLICK, handler(this, "_documentClicked"));
    },
    
    _initLineWidthListListeners: function(graphic)
    {          
        $("#" + InitStyleLists.linewidth.LINEWIDTH_1).addClass(Graphic.css_classes.BUTTON_ON);
        var that = this;
        $("." + InitStyleLists.linewidth.NAV_ITEM_CLASS).each(function() {
            $("#" + this.id).on(Graphic.event.CLICK, handler(that, "_changeLineWidthOn"));
        });
    },
    
    _initStrokeListeners: function(graphic)
    {
        $("#"+InitStyleLists.stroke.WITH).addClass(Graphic.css_classes.BUTTON_ON);
        var that = this;
        $("." + InitStyleLists.stroke.NAV_ITEM_CLASS).each(function() {
            $("#" + this.id).on(Graphic.event.CLICK, handler(that, "_changeStrokeStyleOn"));
        });
    },
    
    _initFillListeners: function(graphic)
    {
        $("#" + InitStyleLists.filling.WITHOUT).addClass(Graphic.css_classes.BUTTON_ON);
        var that = this;
        $("." + InitStyleLists.filling.NAV_ITEM_CLASS).each(function() {
            $("#" + this.id).on(Graphic.event.CLICK, handler(that, "_changeFillStyleOn"));
        });
    },
    
    _documentClicked: function(e)
    {
        var target = e.target;
        if (target.id !== InitStyleLists.id.STROKE_BTTN && !$(target).parents().is("#" + InitStyleLists.id.STROKE_BTTN) &&
            target.id !== InitStyleLists.id.FILL_BTTN && !$(target).parents().is("#" + InitStyleLists.id.FILL_BTTN) &&
            target.id !== InitStyleLists.id.LINE_WIDTH_BTTN && !$(target).parents().is("#" + InitStyleLists.id.LINE_WIDTH_BTTN))
        {
            this._hideSubLists();        
        }
    }, 
    
    _changeLineWidthOn: function(e)
    {
        var cursorId = this._changeLineWidth(this._graphic, e.target.id);
        this._graphic.setActiveSubcursor(cursorId);
        setActiveBttn(InitStyleLists.linewidth.NAV_ITEM_CLASS, e.target.id);           
    },
    
    _changeStrokeStyleOn: function(e)
    {
        this._changeStrokeStyle(this._graphic, e.target.id, InitStyleLists.stroke.WITH);
        setActiveBttn(InitStyleLists.stroke.NAV_ITEM_CLASS, e.target.id);            
    },
    
    _changeFillStyleOn: function(e)
    {
        this._changeFillStyle(this._graphic, e.target.id, InitStyleLists.filling.WITH);
        setActiveBttn(InitStyleLists.filling.NAV_ITEM_CLASS, e.target.id);
    },    
    
    _hideSubLists: function()
    {
        $("#" + InitStyleLists.id.STROKE_STYLES).hide();
        $("#" + InitStyleLists.id.FILL_STYLES).hide();
        $("#" + InitStyleLists.id.LINE_WIDTH_STYLES).hide();
    },
    
    _showSubList: function(e)
    {
        this._hideSubLists();
        
        if (e.target.id == InitStyleLists.id.STROKE_BTTN ||
            $(e.target).parents().is("#" + InitStyleLists.id.STROKE_BTTN))
        {
            $("#" + InitStyleLists.id.STROKE_STYLES).show();
        }
        else if (e.target.id == InitStyleLists.id.FILL_BTTN ||
                $(e.target).parents().is("#" + InitStyleLists.id.FILL_BTTN))
        {
            $("#" + InitStyleLists.id.FILL_STYLES).show();
        }
        else if (e.target.id == InitStyleLists.id.LINE_WIDTH_BTTN ||
                $(e.target).parents().is("#" + InitStyleLists.id.LINE_WIDTH_BTTN))
        {
            $("#" + InitStyleLists.id.LINE_WIDTH_STYLES).show();
        }
    },

    _changeFillStyle: function(graphic, fillStyleId, withStyle)
    {
        if (fillStyleId === withStyle)
        {
            graphic.setFillStyle(true);
        }   
        else
        {
            graphic.setFillStyle(false);
        }
    },

    _changeStrokeStyle: function(graphic, stokeStyleId, withStyle)
    {
        if (stokeStyleId === withStyle)
        {
            graphic.setStrokeStyle(true);
        }   
        else
        {
            graphic.setStrokeStyle(false);
        }
    },

    _changeLineWidth: function(graphic, lineWidthId)
    {
        var pixel = lineWidthId.replace(/\D+/g, '');
        pixel = parseInt(pixel);
        graphic.setToolWidth(pixel);
        return pixel;
    }
}, {
    id:
    {
        STROKE_BTTN: "navItemStroke",
        FILL_BTTN: "navItemFill",
        LINE_WIDTH_BTTN: "navItemLineWidth",
        STROKE_STYLES: "navListStroke",
        FILL_STYLES: "navListFilling",
        LINE_WIDTH_STYLES: "navListLineWidth",
    },
    
    filling:
    {    
        NAV_ITEM_CLASS: "navItemFillStyle",
        WITH: "navItemFillStyleWith",
        WITHOUT: "navItemFillStyleWithout",
    },
    
    stroke:
    {
        NAV_ITEM_CLASS: "navItemStokeStyle",
        WITH: "navItemStokeStyleWith",
        WITHOUT: "navItemStokeStyleWithout",
    },
    
    linewidth:
    {
        NAV_ITEM_CLASS: "navItemPixel",
        LINEWIDTH_1: "navItemPixel1",
        LINEWIDTH_3: "navItemPixel3",
        LINEWIDTH_5: "navItemPixel5",
        LINEWIDTH_8: "navItemPixel8",
    },
});