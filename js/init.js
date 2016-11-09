var islandLive = new IslandLive(5, 5);

$(document).ready(function() {

    var islandInit = islandLive.GetCurrentState();
    var curHtml = islandLive.getHtml();
    $(".island-container").append(curHtml);

    var island_state_Interval = null;
    function step(){
        islandLive.step();
        $(".island-container").append(islandLive.getHtml());
        var curStep = islandLive.GetStepsCount();
        if ($('.island_state_' + (curStep-1)).length)
        {
            $('.island_state_' + (curStep-1)).hide();
            //$('.island_state_' + (curStep-1)).remove();
        }
        if ($('.island_state_' + curStep).length)
        {
            $('.island_state_' + curStep).show();
        }
    }

    $('#step').on('click', function(){
        step();
    });
    $('#auto').on('click', function(){
        island_state_Interval = setInterval(function () {
            step();
        }, $('#stepInterval').val());
    });
    $('#stop').on('click', function(){
        clearInterval(island_state_Interval);
    });
});

function landscapeChange(step, j, i) {
    var oldLandscape = islandLive.getLandscape(j, i);
    var newLandscape = islandLive.changeLandscape(j, i);
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell").addClass(newLandscape);
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell").removeClass(oldLandscape);

    var grass = islandLive.getGrass(j, i);
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").addClass('grass_'+grass);
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").removeClass('grass_1');
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").removeClass('grass_2');
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").removeClass('grass_3');
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").removeClass('grass_4');
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").removeClass('grass_5');
}

function grassChange(step, j, i) {
    var oldGrass = islandLive.getGrass(j, i);
    var newGrass = islandLive.changeGrass(j, i);
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").addClass('grass_'+newGrass);
    $(".island_state_" + step + " .row_" + j + " .column_" + i + " .cell .grass").removeClass('grass_'+oldGrass);
}

function menu(step, j, i, evt) {
    // Блокируем всплывание события contextmenu
    evt = evt || window.event;
    evt.cancelBubble = true;
    // Показываем собственное контекстное меню
    var menu = document.getElementById("contextMenuId");
    var html = "";

    html = "<button onclick='landscapeChange("+step+", "+ j +", " + i +");'>Сменить ландшафт</button>";
    html += "<button onclick='grassChange("+step+", "+ j +", " + i +");'>Изменить траву</button>";
    html += '<br>';

    // Если есть что показать - показываем
    if (html) {
        menu.innerHTML = html;
        menu.style.top = defPosition(evt).y + "px";
        menu.style.left = defPosition(evt).x + "px";
        menu.style.display = "";
    }
    //console.log(j, i);
    // Блокируем всплывание стандартного браузерного меню
    return false;
}

// Закрываем контекстное при клике левой или правой кнопкой по документу
// Функция для добавления обработчиков событий
function addHandler(object, event, handler, useCapture) {
    if (object.addEventListener) {
        object.addEventListener(event, handler, useCapture ? useCapture : false);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler);
    } else alert("Add handler is not supported");
}
// Возвращает случайное целое число между min (включительно) и max (не включая max)
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для определения координат указателя мыши
function defPosition(event) {
    var x = y = 0;
    if (document.attachEvent != null) { // Internet Explorer & Opera
        x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    } else if (!document.attachEvent && document.addEventListener) { // Gecko
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
    } else {
        // Do nothing
    }
    return {x:x, y:y};
}




addHandler(document, "contextmenu", function() {
    document.getElementById("contextMenuId").style.display = "none";
});
addHandler(document, "click", function() {
    document.getElementById("contextMenuId").style.display = "none";
});

