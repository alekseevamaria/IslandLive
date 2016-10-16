var ImageFunctions = Base.extend({
    _upload: null,
    _canvas: null,
    _subCanvas: null, 
    _image: null,
    _loadImg: null,
    _graphic: null,
    
    constructor: function(canvasId, subCanvasId, graphic)
    {
        this._canvas = document.getElementById(canvasId);   
        this._subCanvas = document.getElementById(subCanvasId);   
        this._upload = document.getElementById(ImageFunctions.id.INPUT_FILE);        
        this._graphic = graphic;
        $("#" + ImageFunctions.id.INPUT_FILE).on(Graphic.event.CHANGE, handler(this, "_load"));
        $("#" + ImageFunctions.id.SAVE_BUTTON).on(Graphic.event.CLICK, handler(this, "_save"));
        $("#" + ImageFunctions.id.INPUT_FORM).on(Graphic.event.SUBMIT, handler(this, "_new"));       
    },
    
    _load: function(e)
    {        
        e.preventDefault();        
        $("#" + ImageFunctions.id.OVERLAY).addClass(ImageFunctions.OVERLAY_VISIBLE_CLASS);
        var file = this._upload.files[0],
        reader = new FileReader();
        reader.onload = handler(this, "_readerOnLoad");
        reader.readAsDataURL(file);
        return false;
    },    
    
    _readerOnLoad: function(e)
    {
        var img = new Image();
        img.src = e.target.result;
        img.onload = handler(this, "_imgOnLoad");
    },
    
    _imgOnLoad: function(e)
    {
        this._loadImg = e.target; 
        this._image = new Image();
        this._image.src = this._canvas.toDataURL("image/png"); 
        this._image.onload = handler(this, "_draw");
    },
    
    _draw: function()
    {
        var context = this._canvas.getContext("2d");
        
        var lastFillStyle = context.fillStyle;
        var lastStrokeStyle = context.strokeStyle;
        var lastLineWidth = context.lineWidth;
        
        this._canvas.width = this._loadImg.width;    
        this._canvas.height = this._loadImg.height;
        context.drawImage(this._loadImg,0, 0);        
        this._subCanvas.width = this._loadImg.width;
        this._subCanvas.height = this._loadImg.height;
        this._graphic.setImageChanged(false);
        $("#" + ImageFunctions.id.OVERLAY).removeClass(ImageFunctions.OVERLAY_VISIBLE_CLASS);
        this._graphic.setFillColor(lastFillStyle);
        this._graphic.setStrokeColor(lastStrokeStyle);
        this._graphic.setToolWidth(lastLineWidth);
    },
    
    _save: function()
    {
        var img = this._canvas.toDataURL("image/png");
        var saveButton = document.getElementById(ImageFunctions.id.SAVE_BUTTON);
        saveButton.href = img;
    },
    
    _new: function()
    {
        var width = $("#" + ImageFunctions.id.INPUT_WIDTH).val();
        var height = $("#" + ImageFunctions.id.INPUT_HEIGHT).val();
        if (this._isPositiveInt(width) && this._isPositiveInt(height))
        {
            var context = this._canvas.getContext("2d");
            var lastFillStyle = context.fillStyle;
            var lastStrokeStyle = context.strokeStyle;
            var lastLineWidth = context.lineWidth;
                       
            this._canvas.width = width;
            this._canvas.height = height;                    
            this._subCanvas.width = width;
            this._subCanvas.height = height;
            
            context.fillStyle = "#" + Graphic.DEFAULT_COLOR;
            context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            document.location.href = ImageFunctions.CLOSE_HREF; 
            this._graphic.setImageChanged(false); 
            
            this._graphic.setFillColor(lastFillStyle);
            this._graphic.setStrokeColor(lastStrokeStyle);
            this._graphic.setToolWidth(lastLineWidth);
        }
    },
    
    _isPositiveInt: function(string)
    {
        var n = parseInt(string);
        return (n > 0);
    }    
}, {
    CLOSE_HREF: "#close",
    OVERLAY_VISIBLE_CLASS: "preloader_overlay_visible",
    
    id: 
    {
        INPUT_WIDTH: "width",
        INPUT_HEIGHT: "height",
        SAVE_BUTTON: "save_bttn",
        INPUT_FORM: "form",
        INPUT_FILE: "upload",
        OVERLAY: "preloaderOverlay",
    },
});