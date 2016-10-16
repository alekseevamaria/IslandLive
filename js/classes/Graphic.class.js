var Graphic = Base.extend({
    _canvas: null,
    _canvasID: null,
    _secondaryCanvasID: null,
    _activeTool: null,
    _activeColorPicker: null,
    _pencil: null,
    _eraser: null,
    _rectangleangle: null,
    _ellipse: null, 
    _cursorId: null,
    _lastCursorId: null,

    _itemWidth: null,
    _itemHeight: null,

    _islandConst: [],
    
    constructor: function(canvasId, subCanvasId, width, height, layer, itemWidth, itemHeight)
    {
        this._itemWidth = itemWidth;
        this._itemHeight = itemHeight;
        this._canvas = document.getElementById(canvasId);    
        this._canvasID = canvasId;
        this._secondaryCanvasID = subCanvasId;
        this._resetCanvas(width, height, "#" + Graphic.DEFAULT_COLOR);
        this._resetTools(layer);
        this.initIslandGraphic();
        this._setListeners();
        this._cursorId = 1;
        this._lastCursorId = this._cursorId;
    },   

    setStrokeColor: function(color)
    {
        this._activeTool.setStrokeColor(color);
    },
    
    setFillColor: function(color)
    {
        this._activeTool.setFillColor(color);
    },
    
    setToolWidth: function(width)
    {
        this._activeTool.setLineWidth(width);
    },
    
    setStrokeStyle: function(withStroke)
    {
        this._rectangle.setStrokeStyle(withStroke);
        this._ellipse.setStrokeStyle(withStroke);
    },
    
    setFillStyle: function(withFilling)
    {
        this._rectangle.setFillStyle(withFilling);
        this._ellipse.setFillStyle(withFilling);
    },
    
    setActiveColor: function(color)
    {
        if (this._activeColorPicker == Graphic.color.STROKE) 
        {
            this.setStrokeColor(color);
            $("#" + Graphic.id.PICKER).css(Graphic.PICKER_ATTR, color);
        }
        else if (this._activeColorPicker == Graphic.color.FILL)
        {
            this.setFillColor(color);
            $("#" + Graphic.id.PICKER_2).css(Graphic.PICKER_ATTR, color);
        }
    },
    
    setActiveColorPicker: function(colorPicker)
    {
        this._activeColorPicker = colorPicker;
    },
    
    setActiveSubcursor: function(cursorId)
    {
        this._lastCursorId = this._cursorId;
        this._cursorId = cursorId;
        var lastCursorClass = Graphic.tools.ERASER + this._lastCursorId;
        var newCursorClass = Graphic.tools.ERASER + this._cursorId;
        if ($("#" + this._canvasID).hasClass(lastCursorClass))
        {
            $("#" + this._canvasID).removeClass(lastCursorClass);
            $("#" + this._secondaryCanvasID).removeClass(lastCursorClass);                      
            $("#" + this._canvasID).addClass(newCursorClass);
            $("#" + this._secondaryCanvasID).addClass(newCursorClass);
        }
    },
    
    isImageChanged: function()
    {
        return this._activeTool._imageChanged;
    },
    
    setImageChanged: function(imgChanged)
    {
       this._pencil._imageChanged = imgChanged;
       this._eraser._imageChanged = imgChanged;
       this._rectangle._imageChanged = imgChanged;
       this._ellipse._imageChanged = imgChanged;
    },
    
    _setListeners: function()
    {        
        $(window).off();
        $("#" + this._canvasID).off();
        $("#" + this._secondaryCanvasID).off();
        
        $(window).on(Graphic.event.MOUSE_UP, handler(this._activeTool, "_mouseup"));
        $(window).on(Graphic.event.MOUSE_MOVE, handler(this._activeTool, "_mousemove"));
        
        $("#" + this._canvasID).on(Graphic.event.MOUSE_DOWN, handler(this._activeTool, "_mousedown"));
        $("#" + this._canvasID).on(Graphic.event.MOUSE_MOVE, handler(this._activeTool, "_mousemove"));
        $("#" + this._canvasID).on(Graphic.event.MOUSE_ENTER, handler(this._activeTool, "_mouseenter"));
        $("#" + this._canvasID).on(Graphic.event.MOUSE_LEAVE, handler(this._activeTool, "_mouseleave"));        
        
        $("#" + this._secondaryCanvasID).on(Graphic.event.MOUSE_DOWN, handler(this._activeTool, "_mousedown"));
        $("#" + this._secondaryCanvasID).on(Graphic.event.MOUSE_MOVE, handler(this._activeTool, "_mousemove"));
        $("#" + this._secondaryCanvasID).on(Graphic.event.MOUSE_ENTER, handler(this._activeTool, "_mouseenter"));
        $("#" + this._secondaryCanvasID).on(Graphic.event.MOUSE_LEAVE, handler(this._activeTool, "_mouseleave"));
        
    },
    
    _resetCanvas: function(width, height, color)
    {
        this._canvas.width = width;
        this._canvas.height = height;
        var context = this._canvas.getContext("2d");      
        context.fillStyle = color;
        context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        var secondaryCanvas = document.getElementById(this._secondaryCanvasID);
        secondaryCanvas.width = width;
        secondaryCanvas.height = height;

        $("#" + this._secondaryCanvasID).hide();
    },

    _resetTools: function(layer)
    {
        this._pencil = new Pencil(this._canvasID, this._secondaryCanvasID);        
        this._eraser = new Eraser(this._canvasID, this._secondaryCanvasID);
        this._rectangle = new Rectangle(this._canvasID, layer, this._secondaryCanvasID);
        this._ellipse = new Ellipse(this._canvasID, layer, this._secondaryCanvasID);

        $("#" + Graphic.tools.PENCIL).on(Graphic.event.CLICK, handler(this, "_setActiveTool"));
        $("#" + Graphic.tools.ERASER).on(Graphic.event.CLICK, handler(this, "_setActiveTool"));
        $("#" + Graphic.tools.RECTANGLE).on(Graphic.event.CLICK, handler(this, "_setActiveTool"));
        $("#" + Graphic.tools.ELLIPSE).on(Graphic.event.CLICK, handler(this, "_setActiveTool"));

        this._setActiveTool(Graphic.tools.PENCIL);
    },

    resetColumnsRows: function()
    {
        this._setActiveTool(Graphic.tools.PENCIL);
        /*разделяем поле*/
        for (var j = this._itemWidth; j < this._canvas.width; j+=this._itemWidth)
        {
            this._pencil.drawLine(j, 0, j, this._canvas.width);
        }
        for (var i = this._itemHeight; i < this._canvas.height; i+=this._itemHeight)
        {
            this._pencil.drawLine(0, i, this._canvas.height, i);
        }
    },

    initIslandGraphic: function()
    {
        var grassImageElement = $("#grass_image");
        var sunImageElement = $("#sun_image");
        var rainImageElement = $("#rain_image");

        this._islandConst['images'] = [];
        this._islandConst['images']['field'] = new Image();
        this._islandConst['images']['field'].src = "images/icons/field.jpg";
        this._islandConst['images']['mountain'] = new Image();
        this._islandConst['images']['mountain'].src = "images/icons/mountain.jpg";
        this._islandConst['images']['river'] = new Image();
        this._islandConst['images']['river'].src = "images/icons/river.jpg";

        this._islandConst['images']['grass'] = new Image();
        this._islandConst['images']['grass'].src = grassImageElement.attr('src');
        this._islandConst['images']['grass'].height = grassImageElement.attr('height');

        this._islandConst['images']['sun'] = new Image();
        this._islandConst['images']['sun'].src = sunImageElement.attr('src');
        this._islandConst['images']['sun'].height = sunImageElement.attr('height');
        this._islandConst['images']['sun'].width = sunImageElement.attr('width');

        this._islandConst['images']['rain'] = new Image();
        this._islandConst['images']['rain'].src = rainImageElement.attr('src');
        this._islandConst['images']['rain'].height = rainImageElement.attr('height');
        this._islandConst['images']['rain'].width = rainImageElement.attr('width');
    },

    showInitState: function(island)
    {
        var context = this._canvas.getContext("2d");
        var that = this;
        this._islandConst['images']['river'].onload = function() {
            var landscape = "";
            var grass = 0;
            for (var j = 0; j < island.length; j++)
            {
                for (var i = 0; i < island[j].length; i++)
                {
                    landscape = island[j][i]['landscape'];
                    grass = island[j][i]['grass'];
                    context.drawImage(that._islandConst['images'][landscape], i*that._itemWidth, j*that._itemHeight);
                    if (grass !== false && grass > 0)
                    {
                        context.drawImage(that._islandConst['images']['grass'], i*that._itemWidth, j*that._itemHeight + that._itemHeight - that._islandConst['images']['grass'].height);
                    }
                }
            }
        };
    },

    showState: function(island)
    {
        var context = this._canvas.getContext("2d");
        var that = this;
        var sun = 0;
        var rain = 0;
        var grass = 0;
        for (var j = 0; j < island.length; j++)
        {
            for (var i = 0; i < island[j].length; i++)
            {
                sun = island[j][i]['sun'];
                rain = island[j][i]['rain'];
                grass = island[j][i]['grass'];
                if (sun > 0)
                {
                    for (var sunIndex = 0; sunIndex < sun; sunIndex++){
                        context.drawImage(that._islandConst['images']['sun'], i*that._itemWidth+sunIndex*that._islandConst['images']['sun'].width, j*that._itemHeight);
                    }
                }
                if (rain > 0)
                {
                    for (var rainIndex = 0; rainIndex < rain; rainIndex++){
                        context.drawImage(that._islandConst['images']['rain'], i*that._itemWidth+rainIndex*that._islandConst['images']['rain'].width, j*that._itemHeight + that._islandConst['images']['sun'].height);
                    }
                }

                if (grass !== false && grass > 0)
                {
                    context.drawImage(that._islandConst['images']['grass'], i*that._itemWidth, j*that._itemHeight + that._itemHeight - that._islandConst['images']['grass'].height);
                }
            }
        }
    },

    _setActiveTool: function(e)
    {        
        var activeBttnId = (e.target) ? e.target.id: e;
        this._activeTool =  
            (activeBttnId == Graphic.tools.PENCIL) ? this._pencil : 
            (activeBttnId == Graphic.tools.ERASER) ? this._eraser :             
            (activeBttnId == Graphic.tools.RECTANGLE) ? this._rectangle :           
            (activeBttnId == Graphic.tools.ELLIPSE) ? this._ellipse : null;
        
        this._setActiveButton(activeBttnId);
        this._setListeners();
        this._setActiveCursor(activeBttnId);
    },
    
    _setActiveButton: function(activeBttnId)
    {
        this._resetBtn(Graphic.tools.PENCIL);
        this._resetBtn(Graphic.tools.ERASER);
        this._resetBtn(Graphic.tools.RECTANGLE);
        this._resetBtn(Graphic.tools.ELLIPSE);       
        
        if($("#" + activeBttnId).hasClass(Graphic.css_classes.BUTTON)) 
        {
            $("#" + activeBttnId).removeClass(Graphic.css_classes.BUTTON);
            $("#" + activeBttnId).addClass(Graphic.css_classes.BUTTON_ON);
        }
    },
    
    _setActiveCursor: function(activeBttnId)
    {      
        $("#" + this._canvasID).removeClass(Graphic.tools.PENCIL);
        $("#" + this._canvasID).removeClass(Graphic.tools.ERASER + this._lastCursorId);
        $("#" + this._canvasID).removeClass(Graphic.tools.ERASER + this._cursorId);
        $("#" + this._canvasID).removeClass(Graphic.tools.RECTANGLE);
        $("#" + this._canvasID).removeClass(Graphic.tools.ELLIPSE);
        
        $("#" + this._secondaryCanvasID).removeClass(Graphic.tools.PENCIL);
        $("#" + this._secondaryCanvasID).removeClass(Graphic.tools.ERASER + this._lastCursorId);
        $("#" + this._secondaryCanvasID).removeClass(Graphic.tools.ERASER + this._cursorId);
        $("#" + this._secondaryCanvasID).removeClass(Graphic.tools.RECTANGLE);
        $("#" + this._secondaryCanvasID).removeClass(Graphic.tools.ELLIPSE);
        
        activeBttnId = (activeBttnId === Graphic.tools.ERASER) ? activeBttnId + this._cursorId : activeBttnId;
        $("#" + this._canvasID).addClass(activeBttnId);
        $("#" + this._secondaryCanvasID).addClass(activeBttnId);       
    },
    
    _resetBtn: function(bttnId)
    {
        var tool = $("#" + bttnId);
        if (tool.hasClass(Graphic.css_classes.BUTTON_ON)) 
        {    
            tool.removeClass(Graphic.css_classes.BUTTON_ON);   
        }
        tool.addClass(Graphic.css_classes.BUTTON);
    }
}, {
    PICKER_ATTR: "border-color",
    DEFAULT_COLOR: "fff",
    DEFAULT_STROKE_COLOR: "000",
    
    tools:
    {
        PENCIL: "pencil",
        ERASER: "eraser",
        RECTANGLE: "rectangle",
        ELLIPSE: "ellipse",
    },
    
    color:
    {
        STROKE: "color1",
        FILL: "color2",
    },
    
    event: 
    {
        MOUSE_DOWN: "mousedown",
        MOUSE_UP: "mouseup",
        MOUSE_MOVE: "mousemove",
        MOUSE_ENTER: "mouseenter",
        MOUSE_LEAVE: "mouseleave",
        CLICK: "click", 
        CHANGE: "change",
        SUBMIT: "submit",
    },
    
    css_classes:
    {
        BUTTON: "button",
        BUTTON_ON: "button_on",
        COLOR_BUTTON: "colorBttn",
        CHANGE_COLOR_BUTTON: "color_button",
    },
    
    id:
    {
        PICKER: "picker",
        PICKER_2: "picker2",
    },
});