var Tool = Base.extend({    
    _context: null,
    _subContext: null,    
    _canvasX: null,
    _canvasY: null,
    _painting: false,
    _stroke: true,
    _fill: false,
    _x0: null,
    _y0: null,
    _imageChanged : false, 
    
    constructor: function(canvasElement, subCanvasElement)
    {
        this._context = canvasElement.getContext("2d");
        if (subCanvasElement)
        {
            this._subContext = subCanvasElement.getContext("2d");
        }
        this._canvasX = $("#" + Tool.CANVAS_PARENT_ID).position().left;
        this._canvasY = $("#" + Tool.CANVAS_PARENT_ID).position().top;
    },
    
    reset: function()
    { 
        this.setStrokeColor(Tool.COLOR);
        this.setFillColor(Tool.FILL_COLOR);
        this.setLineWidth(Tool.LINEWIDTH);               
    },  
    
    getStrokeColor: function()
    {
        if (this._context)
        {
            return this._context.strokeStyle;
        }
        if (this._subContext)
        {
            return this._subContext.strokeStyle;
        }
    },
    
    getFillColor: function()
    {
        if (this._context)
        {
            return this._context.fillStyle;
        }
        if (this._subContext)
        {
            return this._subContext.fillStyle;
        }
    }, 
    
    getLineWidth: function()
    {
        if (this._context)
        {
            return this._context.lineWidth;
        }
        if (this._subContext)
        {
            return this._subContext.lineWidth;
        }
    },
    
    setStrokeColor: function(color)
    {
        if (this._context)
        {
            this._context.strokeStyle = color;
        }
        if (this._subContext)
        {
            this._subContext.strokeStyle = color;
        }
    },
    
    setFillColor: function(color)
    {
        if (this._context)
        {
            this._context.fillStyle = color;
        }
        if (this._subContext)
        { 
            this._subContext.fillStyle = color;
        }
    },
    
    setLineWidth: function(lineWidth)
    {
        var n = parseInt(lineWidth);
        if (n > 0)
        {
            if (this._context)
            {
                this._context.lineWidth = lineWidth;
            }
            if (this._subContext)
            {
                this._subContext.lineWidth = lineWidth;
            }
        }
    },
    
    setStrokeStyle: function(withStroke)
    {
        this._stroke = withStroke;
    },  
    
    setFillStyle: function(withFill)
    {
        this._fill = withFill;
    },
    
    _mousedown: function(e)
    {
    },
    
    _mouseup: function(e)
    {
        if (isLeftMouseDown(e) && this._painting)
        {
            this._painting = false;
        }
    },
    
    _mousemove: function(e)
    {    
    },
    
    _mouseenter: function(e)
    {
    },
    
    _mouseleave: function(e)
    {     
    } 
}, {
    CANVAS_PARENT_ID: "canvasContainer",
    COLOR: 'black',
    FILL_COLOR: 'white',
    LINEWIDTH: 1
});