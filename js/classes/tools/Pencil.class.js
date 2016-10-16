var Pencil = Brush.extend({
    drawLine: function(x0, y0, x1, y1)
    {
        this._context.beginPath();
        this._context.moveTo(x0 + Pencil.ERROR, y0 + Pencil.ERROR);
        this._context.lineTo(x1 + Pencil.ERROR, y1 + Pencil.ERROR);    
        this._context.stroke();
    },
    
    drawFirstLine: function(x0, y0)
    {
        this._context.beginPath();
        this._context.moveTo(x0 + Pencil.ERROR, y0 + Pencil.ERROR);
        this._context.lineTo(x0 + Pencil.ERROR, y0 + Pencil.ERROR + 0.1);     
        this._context.stroke();
    },
    
    _saveState: function()
    {
        this._lastLineCap = this._context.lineCap;
        
        this._context.lineCap = Pencil.LINECAP; 
    },
    
    _backState: function()
    {    
        this._context.lineCap = this._lastLineCap; 
    }  
}, {
    LINECAP: "round",
    ERROR: 0.5
});