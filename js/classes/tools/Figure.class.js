var Figure = Tool.extend({
    _lastImg: null,
    _layer: null,
    
    constructor: function( canvasId, layer, subCanvasId)
    {    
        var canvasElement = document.getElementById(canvasId);
        var subCanvasElement = document.getElementById(subCanvasId);
        this.base(canvasElement, subCanvasElement);
        this.reset();
        this._layer = layer;
    },
    
    _drawFigure: function(x, y, width, height)
    {
        /*
         * перегружена в наследниках
         */
    },
    
    _mousedown: function(e)
    {
        if (isLeftMouseDown(e))
        {
            this._painting = true;
            this._x0 = e.pageX - this._canvasX;
            this._y0 = e.pageY - this._canvasY; 
       
            this._layer.showLayer();
        }
    },    
    
    _mouseup: function(e)
    {
        if (this._painting)
        {
            this._painting = false;  
            this._imageChanged = true;
        }
        this._draw(e);
        this._layer.hideLayer();
    },
    
    _mousemove: function(e)
    {
        this._draw(e);
    },
    
    _draw: function(e)
    {
        if (this._painting)
        {
            this._subContext.clearRect(0, 0, this._subContext.canvas.width, this._subContext.canvas.height);

            var x1 = e.pageX - this._canvasX;
            var y1 = e.pageY - this._canvasY;                        
            this._drawFigure(this._x0, this._y0, x1 - this._x0, y1 - this._y0);
        }
    }
});