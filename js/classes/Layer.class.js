var Layer = Base.extend({
    _context: null,
    _subContext: null,
    _canvasID: null, 
    _subCanvasID: null,
    _imgData: null,
    _subImage: null,
    _painting: false,
    
    constructor: function(canvasID, subCanvasID)
    {
        var canvas = document.getElementById(canvasID);
        var subCanvas = document.getElementById(subCanvasID);
        this._context = canvas.getContext("2d");
        this._subContext = subCanvas.getContext("2d");
        this._canvasID = canvasID;
        this._subCanvasID = subCanvasID;
        $("#" + subCanvasID).hide();        
    },
    
    showLayer: function()
    {
        if (!this._painting)
        {        
            this._subContext.clearRect(0, 0, this._subContext.canvas.width, this._subContext.canvas.height);
            $("#" + this._subCanvasID).className = $("#" + this._canvasID).className;

            $("#" + this._subCanvasID).show(); 
            this._painting = true;
        }
    },

    hideLayer: function()
    {
        if (this._painting)
        {   
            this._subImage = new Image();
            this._subImage.src = this._subContext.canvas.toDataURL('image/png'); 
            this._subImage.onload = handler(this, "_draw");            
        }
    },
    
    _draw: function()
    {
        this._context.drawImage(this._subImage, 0, 0);
        $("#" + this._subCanvasID).hide();
        this._painting = false;
    }    
});