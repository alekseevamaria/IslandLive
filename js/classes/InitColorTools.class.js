var InitColorTools = Base.extend({
    _graphic: null,
    
    constructor: function(graphic)
    { 
        this._graphic = graphic;
        this._initColorPicker(Graphic.id.PICKER, Graphic.DEFAULT_STROKE_COLOR, graphic);
        this._initColorPicker(Graphic.id.PICKER_2, Graphic.DEFAULT_COLOR, graphic);
        this._initDefaultColorButtons(graphic);  

        this._initColorButtons(graphic);
    },

    _initColorButtons: function(graphic)
    {
        this._initColorButton(graphic, Graphic.color.STROKE, Graphic.css_classes.COLOR_BUTTON);
        this._initColorButton(graphic, Graphic.color.FILL, Graphic.css_classes.COLOR_BUTTON);
        $("#" + Graphic.color.STROKE).click();
    },

    _initColorButton: function(graphic, colorBttnId, colorBttnClass)
    {
        $("#" + colorBttnId).on(Graphic.event.CLICK, function(){
            setActiveBttn(colorBttnClass, colorBttnId);
            graphic.setActiveColorPicker(colorBttnId);
        });
    },

    _initColorPicker: function(pickerId, defaultColor, graphic)
    {
        $("#"+pickerId).colpick({
            layout: "rgbhex",
            submit: 0,        
            colorScheme: "dark",
            onChange: function(hsb,hex,rgb,el,bySetColor) {
                $(el).css("border-color","#"+hex);
                if (!bySetColor) 
                {
                    $(el).val(hex);
                    if (pickerId === Graphic.id.PICKER)
                    {
                        graphic.setStrokeColor("#"+hex);
                    }
                    else if (pickerId === Graphic.id.PICKER_2)
                    {
                        graphic.setFillColor("#"+hex);
                    }
                }
            }
        });
            
        $("#"+pickerId).keyup(function(){
            $(this).colpickSetColor(this.value);
        });
        
        $("#"+pickerId).val(defaultColor);    
    },

    _initDefaultColorButtons: function(graphic)
    {        
        var that = this;
        $("."+Graphic.css_classes.CHANGE_COLOR_BUTTON).each(function() {
            $("#"+this.id).on(Graphic.event.CLICK, handler(that, "_changeColorOn"));
        });
    },
     
    _changeColorOn: function(e)
    {
        var colorId = this._changeColor(this._graphic, e.target.id);
        setActiveBttn(Graphic.css_classes.CHANGE_COLOR_BUTTON, colorId);
    },
    
    _changeColor: function(graphic, colorId)
    {
        if (colorId.indexOf("Color") !== -1) 
        {
            colorId = colorId.substring(0, colorId.length-5);
        }
        var colorButtonId = colorId + "Color";
        var color = $("#"+colorId).css("background-color");
            
        graphic.setActiveColor(color);
        return colorButtonId;
    }
});   