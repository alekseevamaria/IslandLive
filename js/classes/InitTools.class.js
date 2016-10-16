var InitTools = Base.extend({
    _canvasId: null,
    _subCanvasId: null,
    _width: null,
    _height: null,
    _filterRadius: null,
    
    _layer: null,
    _graphic: null,
    _imgloader: null,
    _gaussianBlur: null,
    _edgeDetection: null,    
    _nextDialog: null,

    _columns: null,
    _rows: null,
    _itemWidth: null,
    _itemHeight: null,
    
    constructor: function(canvasId, subCanvasId, itemWidth, itemHeight, filterRadius, columns, rows )
    {
        var width = columns * itemWidth;
        var height = rows * itemHeight;
        this._itemWidth = itemWidth;
        this._itemHeight = itemHeight;
        this._canvasID = canvasId;
        this._secondaryCanvasID = subCanvasId;
        this._width = width;
        this._height = height;
        this._filterRadius = filterRadius;
        this._layer = new Layer(canvasId, subCanvasId);
        this._graphic = new Graphic(canvasId, subCanvasId, width, height, this._layer, itemWidth, itemHeight);
        this._imgloader = new ImageFunctions(canvasId, subCanvasId, this._graphic);
        this._gaussianBlur = new GaussianBlur(canvasId, filterRadius);
        this._edgeDetection = new EdgeDetection(canvasId, filterRadius);
        
        $("#" + InitTools.id.BLUR_FILTER).on(InitTools.event.CLICK, handler(this, "_filterOn"));
        $("#" + InitTools.id.EDGE_DETECTION_FILTER).on(InitTools.event.CLICK, handler(this, "_filterOn"));
       
        var menu = new InitMenu();       
        var styleLists = new InitStyleLists(this._graphic);
        var colorTools = new InitColorTools(this._graphic);        
        this._initBttnDialogs();
    },

    getGraphic : function () {
        return this._graphic;
    },

    _filterOn: function(e)
    {
        this._showOverlay()
        this._applyFilter(e.target.id);        
        this._hideOverlay();
    },
    
    _applyFilterByWorker: function(buttonId)
    {
        this._showOverlay();
        this._applyFilter(buttonId);
        this._hideOverlay();
    },
    
    _applyFilter: function(buttonId)
    {
        if (buttonId == InitTools.id.BLUR_FILTER)
        {
            return this._gaussianBlur.apply();
        }
        else
        {        
            return this._edgeDetection.apply();
        }
    },
    
    _showOverlay: function()
    {
        $("#" + InitTools.id.OVERLAY).addClass(InitTools.OVERLAY_VISIBLE_CLASS);
    },
    
    _hideOverlay: function()
    {
        $("#" + InitTools.id.OVERLAY).removeClass(InitTools.OVERLAY_VISIBLE_CLASS);
    },
    
    _initBttnDialogs: function()
    {
        $("#" + InitTools.id.SAVE_CHANGES).on(InitTools.event.CLICK, handler(this, "_saveImg"));
        $("#" + InitTools.id.NOT_SAVE_CHANGES).on(InitTools.event.CLICK, handler(this, "_saveImg"));
        $("#" + InitTools.id.OPEN_IMAGE).on(InitTools.event.CLICK, handler(this, "_saveOpenBttnClicked"));
        $("#" + InitTools.id.NEW_IMAGE).on(InitTools.event.CLICK, handler(this, "_saveNewBttnClicked"));
    },
    
    _saveImg: function(e)
    {
        if (e.target.id == InitTools.id.SAVE_CHANGES)
        {
            document.getElementById(InitTools.id.SAVE_IMAGE).click();
        }
        if (this._nextDialog == InitTools.id.OPEN_IMAGE)
        {
            document.getElementById(InitTools.id.CLOSE_SAVE_CHANGES_DIALOG).click();
            document.getElementById(InitTools.id.LOAD_IMAGE_DIALOG).click();
        }
        else if (this._nextDialog == InitTools.id.NEW_IMAGE)
        {
            window.location.hash = InitTools.id.NEW_IMAGE_DIALOG;
        }
    },
    
    _saveOpenBttnClicked: function(e)
    {
        var openBttnEl = document.getElementById(InitTools.id.OPEN_IMAGE);
        if (this._graphic.isImageChanged())
        {
            openBttnEl.href = "#" + InitTools.id.SAVE_CHANGES_DIALOG;
            this._nextDialog = InitTools.id.OPEN_IMAGE;
        }
        else
        {
            openBttnEl.href = "javascript:void(0)";
            document.getElementById(InitTools.id.LOAD_IMAGE_DIALOG).click();
        }  
    },
    
    _saveNewBttnClicked: function(e)
    {
        var newBtnEl = document.getElementById(InitTools.id.NEW_IMAGE);
        if (this._graphic.isImageChanged())
        {
            newBtnEl.href = "#" + InitTools.id.SAVE_CHANGES_DIALOG;
            this._nextDialog = InitTools.id.NEW_IMAGE;
        }
        else
        {
            newBtnEl.href = "javascript:void(0)";
            window.location.hash = InitTools.id.NEW_IMAGE_DIALOG;
        }
    }
},{
    OVERLAY_VISIBLE_CLASS: "preloader_overlay_visible",
    
    event:
    {
        CLICK: "click"
    },
    
    id:
    {
        BLUR_FILTER: "filter",
        CANSEL_FILTER: "back",
        EDGE_DETECTION_FILTER: "edgeDetection",
        CANSEL_EDGE_DETECTION_FILTER: "edgeDetectionBack",
        SAVE_CHANGES: "save",
        NOT_SAVE_CHANGES: "notSave",
        OPEN_IMAGE: "open",
        SAVE_IMAGE: "save_bttn",
        NEW_IMAGE: "new",
        SAVE_CHANGES_DIALOG: "saveChanges",
        LOAD_IMAGE_DIALOG: "upload",
        NEW_IMAGE_DIALOG: "modalwindow",
        CLOSE_SAVE_CHANGES_DIALOG: "saveFormClose",
        OVERLAY: "preloaderOverlay",
        
    },
});