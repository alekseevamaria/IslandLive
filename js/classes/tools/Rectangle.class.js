var Rectangle = Figure.extend({
    _drawFigure: function(x0, y0, width, height)
    {
        var line = this.getLineWidth();
        var halfLine = line / 2;
        
        var x = (width > 0) ? x0 + halfLine : x0 - halfLine;
        var y = (height > 0) ? y0 + halfLine : y0 - halfLine;
        var w = (width > 0) ? width - line : width + line;
        var h = (height > 0) ? height - line : height + line;
        
        if (this._stroke)
        {
            this._subContext.strokeRect(x, y, w, h);
        }
        if (this._fill)        
        {
            this._subContext.fillRect(x, y, w, h);
        }
    } 
});