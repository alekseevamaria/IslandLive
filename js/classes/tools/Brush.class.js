var Brush = Tool.extend({    
    constructor: function(canvasId, subCanvasId)
    {        
        var canvasElement = document.getElementById(canvasId);
        var subCanvasElement = document.getElementById(subCanvasId);
        this.base(canvasElement, subCanvasElement);   
        this.reset();     
    },
    
    drawLine: function(x0, y0, x1, y1)
    {
        /*
         * перегружена в наследниках
         */
    },
    
    drawFirstLine: function(x0, y0, x1, y1)
    {
        /*
         * перегружена в наследниках
         */
    },
    
    _saveState: function()
    {
        /*
         * перегружена в наследниках
         */
    },
    
    _backState: function()
    {
         /*
         * перегружена в наследниках
         */
    },
    
    _mouseup: function(e)
    {
        if (isLeftMouseDown(e) && this._painting)
        {            
            this._painting = false;
            this._imageChanged = true;
            this._backState();              
        }
    },

    _mousedown: function(e)
    {
        if (isLeftMouseDown(e))
        {
            this._painting = true;
            this._x0 = e.pageX - this._canvasX;
            this._y0 = e.pageY - this._canvasY;
            this._saveState();
            this.drawFirstLine(this._x0, this._y0);  
        }
    },    
    
    _mousemove: function(e)
    {
        if (this._painting)
        {           
            var x1 = e.pageX - this._canvasX;
            var y1 = e.pageY - this._canvasY; 
            this.drawLine(this._x0, this._y0, x1, y1);
            
            this._x0 = x1;
            this._y0 = y1;
        }         
    }
});