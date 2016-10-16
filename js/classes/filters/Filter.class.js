var Filter = Tool.extend({
    _size: null,
    _matrix: null,
    _lastImg: null,
    _canvas: null,
    _firstImg: null,
    _isFirstApplying: true,
    _withAjust: false,
    
    constructor: function(canvasId, size)
    {
        this._canvas = document.getElementById(canvasId);
        this.base(this._canvas);
    
        this.setSize(size);
    },
    
    setSize: function(size)
    {
        this._size = size;
        this.reset();
    },
    
    reset: function()
    {        
        this._matrix = [];
        for (var i = 0; i < this._size; i++)
        {
            this._matrix[i] = [];
            for (var j = 0; j < this._size; j++)
            {
                this._matrix[i][j] = 1;
            }
        }
        
    },
    
    apply: function()
    {      
        var imgWidth = this._canvas.width;
        var imgHeight = this._canvas.height;
        var matrixRadius = (this._size - 1) / 2;
        var imgData = this._context.getImageData(0, 0, imgWidth, imgHeight);
                
        this._lastImg = this._context.getImageData(0, 0, imgWidth, imgHeight);
        
        for (var i = 0; i < imgData.data.length; i += 4)
        {
            imgData.data[i]=0;
            imgData.data[i+1]=0;
            imgData.data[i+2]=0;
            imgData.data[i+3]=0;
                     
            for (var iM = -matrixRadius; iM <= matrixRadius; iM++)
            {
                for (var jM = -matrixRadius; jM <= matrixRadius; jM++)
                {   
                    var index = (imgWidth * iM + jM) * 4;
                    if (this._lastImg.data[i + index])
                    {                        
                        var coeff = this._matrix[iM+matrixRadius][jM+matrixRadius];
                        
                        imgData.data[i] += this._lastImg.data[i + index] * coeff;
                        imgData.data[i + 1] += this._lastImg.data[i + index + 1] * coeff;
                        imgData.data[i + 2] += this._lastImg.data[i + index + 2] * coeff;
                        imgData.data[i + 3] += this._lastImg.data[i + index + 3] * coeff;
                    }
                }
            }
            if (this._withAjust)
            {
                imgData.data[i] = this._adjustR(imgData.data[i]);
                imgData.data[i + 1] = this._adjustG(imgData.data[i + 1]);
                imgData.data[i + 2] = this._adjustB(imgData.data[i + 2]);
                imgData.data[i + 3] = this._adjustAlfa(imgData.data[i + 3]);
            }
        }        
        this._context.putImageData(imgData, 0, 0);
        return imgData;
    },
    
    back: function()
    {
        if (this._lastImg !== null)
        {
            this._context.putImageData(this._lastImg, 0, 0);
        }
    },
    
    _adjustR: function(r)
    {
        return r;
    },
    
    _adjustG: function(g)
    {
        return g;
    },
    
    _adjustB: function(b)
    {
        return b;
    },
    
    _adjustAlfa: function(a)
    {
        return a;
    }
});