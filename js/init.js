$(document).ready(function() {
    var initTools = new InitTools("layer", "subLayer", 800, 600, 3);
});

function setActiveBttn(buttonsClass, bttnId)
{
    $("." + buttonsClass).each(function() {
        $(this).removeClass(Graphic.css_classes.BUTTON_ON);           
    });
    $("#" + bttnId).addClass(Graphic.css_classes.BUTTON_ON);
}