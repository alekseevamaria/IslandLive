var Eraser = Brush.extend({
    _lastStrokeColor: null,
    _lastFillColor: null,
    _lastLineWidth: null,

    reset: function()
    {
    },
    
    drawFirstLine: function(x0, y0)
    {        
        var linewidth = this.getLineWidth();
        this._context.fillRect(x0, y0, linewidth, linewidth); 
    },
    
    drawLine: function(x0, y0, x1, y1)
    {
        var deltaX = Math.abs(x1 - x0);
        var deltaY = Math.abs(y1 - y0);
        var error = 0;
        var linewidth = this.getLineWidth();
        
        var deltaerrMin = Math.min(deltaX, deltaY);
        var deltaerrMax = Math.max(deltaX, deltaY);
        var iChanging = deltaX >= deltaY;

        for (var i = x0, j = y0; 
            i != x1 || j != y1; 
            j = this._changeJ(j, !iChanging, y0, y1), i = this._changeI(i, iChanging, x0, x1))
        {
            this._context.fillRect(i, j, linewidth, linewidth); 
            error += deltaerrMin;
            if (2 * error >= deltaerrMax)
            {
                i = this._changeI(i, !iChanging, x0, x1);
                j = this._changeJ(j, iChanging, y0, y1);
                error -= deltaerrMax; 
            }
        }
    },
    
    _changeI: function(i, changing, x0, x1)
    {
        if (changing && x0 > x1)
        {
            i--;
        }
        else if (changing && x0 < x1)
        {
            i++;
        }
        return i;
    },
    
    _changeJ: function(j, changing, y0, y1)
    {
        if (changing && y0 > y1)
        {
            j--;
        }
        else if (changing && y0 < y1)
        {
            j++;
        }
        return j;
    },
    
    _saveState: function()
    {
        this._lastStrokeColor = this.getStrokeColor();
        this._lastLineWidth = this.getLineWidth();
        this._lastFillColor = this.getFillColor();
        
        this.setStrokeColor(Eraser.COLOR);
        this.setFillColor(Eraser.COLOR);
        this.setLineWidth(this._lastLineWidth + Eraser.LINEWIDTH);       
    },
    
    _backState: function()
    {
        this.setStrokeColor(this._lastStrokeColor);   
        this.setLineWidth(this._lastLineWidth); 
        this.setFillColor(this._lastFillColor);     
    }
}, {
    COLOR: '#fff',
    LINEWIDTH: 3
});