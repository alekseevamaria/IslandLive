var GaussianBlur = Filter.extend({
    reset: function()
    {                
        var double_Sigma_in_2 = 2 * this._size * this._size;
        var divisor = double_Sigma_in_2 * Math.PI;
        var sum = 0;
    
        this._matrix = [];
        for (var i = 0; i < this._size; i++)
        {
            var y = Math.abs(i - this._size / 2);        
            this._matrix[i] = [];
            for (var j = 0; j < this._size; j++)
            {
                var x = Math.abs(j - this._size / 2);
                this._matrix[i][j] = Math.exp((0 - (x * x + y * y) / double_Sigma_in_2) / divisor);
                sum += this._matrix[i][j];
            }
        }
        
        for (var k = 0; k < this._size; k++)
        {
            for (var m = 0; m < this._size; m++)
            {
                this._matrix[k][m] /= sum;
            }
        }
    }
});