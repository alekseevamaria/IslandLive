var Ellipse = Figure.extend({
    _drawFigure: function(x0, y0, width, height)
    {
        var a = width/2;
        var b = height/2;       
        var centerX = x0 + a;
        var centerY = y0 + b;
        
        this._subContext.save();
        this._subContext.beginPath();
       
        this._subContext.translate(centerX, centerY);
        this._subContext.scale(a / b, 1);
        
        this._subContext.arc(0, 0, Math.abs(b), 0, Math.PI * 2, true);
        
        this._subContext.restore();
        this._subContext.closePath();
        
        if (this._stroke)
        {
            this._subContext.stroke();
        }
        if (this._fill)
        {
            this._subContext.fill();
        }
    }
});