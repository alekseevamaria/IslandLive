var EdgeDetection = Filter.extend({
    reset: function()
    {      
        this._withAjust = true;
        var halfSize = Math.round(this._size / 2) - 1;
        this._matrix = [];
        for (var i = 0; i < this._size; i++)
        {        
            this._matrix[i] = [];
            for (var j = 0; j < this._size; j++)
            {      
                if ( i === halfSize || j === halfSize)
                {
                    this._matrix[i][j] = -1;
                }
                else
                {
                    this._matrix[i][j] = 0;
                }     
            }
        }
        
        this._matrix[halfSize][halfSize] = (this._size - 2) * 4;     
        var maxCoeef = this._matrix[halfSize][halfSize];
         
        for (var k = 0; k < this._size; k++)
        {
            for (var m = 0; m < this._size; m++)
            {
                this._matrix[k][m] /= maxCoeef;
            }
        }
    },
    
    _adjustAlfa: function(a)
    {
        return 255;
    },
    
    _adjustR: function(r)
    {
        return r + 128;
    },
    
    _adjustG: function(g)
    {
        return g + 128;
    },
    
    _adjustB: function(b)
    {
        return b + 128;
    }
});