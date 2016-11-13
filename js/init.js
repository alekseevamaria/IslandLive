var islandLive = new IslandLive(5, 5);

$(document).ready(function() {

    var islandInit = islandLive.GetCurrentState();
    var curHtml = islandLive.getHtml();
    $(".island-container").append(curHtml);

    var island_state_Interval = null;
    function step(){
        return islandLive.step();
    }
    function showStep(){
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

    var stepTitle = $('#step').html() + ' ';
    var autoTitle = $('#auto').html() + ' ';
    $('#step').on('click', function(){
        var curStepTitle = step();
        $('#step').html(stepTitle + curStepTitle);
        $('#auto').html(autoTitle + curStepTitle);
        showStep();
    });
    $('#auto').on('click', function(){
        island_state_Interval = setInterval(function () {
            var curStepTitle = step();
            $('#step').html(stepTitle + curStepTitle);
            $('#auto').html(autoTitle + curStepTitle);
            showStep();
        }, $('#stepInterval').val());
    });

    var curStepTitle = islandLive.getNextStep();
    $('#step').html(stepTitle + curStepTitle);
    $('#auto').html(autoTitle + curStepTitle);

    $('#stop').on('click', function(){
        clearInterval(island_state_Interval);
    });
});

function getCellSelector(step, j, i) {
    return ".island_state_" + step + " .row_" + j + " .column_" + i + " .cell";
}
function landscapeChange(step, j, i) {
    var oldLandscape = islandLive.getLandscape(j, i);
    var newLandscape = islandLive.changeLandscape(j, i);
    var cellSelector = getCellSelector(step, j, i);
    var grassSelector = cellSelector + " .grass";
    var rabbitSelector = cellSelector + " .rabbit";
    $(cellSelector).addClass(newLandscape);
    $(cellSelector).removeClass(oldLandscape);

    var grass = islandLive.getGrass(j, i);
    $(grassSelector).addClass('grass_'+grass);
    $(grassSelector).removeClass('grass_1');
    $(grassSelector).removeClass('grass_2');
    $(grassSelector).removeClass('grass_3');
    $(grassSelector).removeClass('grass_4');
    $(grassSelector).removeClass('grass_5');

    var rabbit = islandLive.getRabbit(j, i);
    $(rabbitSelector).addClass('rabbit_'+rabbit);
    $(rabbitSelector).removeClass('rabbit_1');
    $(rabbitSelector).removeClass('rabbit_2');
    $(rabbitSelector).removeClass('rabbit_3');
}

function grassChange(step, j, i) {
    var oldGrass = islandLive.getGrass(j, i);
    var newGrass = islandLive.changeGrass(j, i);
    if (newGrass == false)
    {
        return;
    }
    var cellSelector = getCellSelector(step, j, i);
    var grassSelector = cellSelector + " .grass";
    $(grassSelector).addClass('grass_'+newGrass);
    $(grassSelector).removeClass('grass_'+oldGrass);
}

function rabbitChange(step, j, i)
{
    var oldRabbit = islandLive.getRabbit(j, i);
    var newRabbit = islandLive.addRabbit(j, i);
    if (newRabbit == false)
    {
        return;
    }
    var cellSelector = getCellSelector(step, j, i);
    var rabbitSelector = cellSelector + " .rabbit";
    $(rabbitSelector).addClass('rabbit_'+newRabbit);
    $(rabbitSelector).removeClass('rabbit_'+oldRabbit);
}

function sunChange(step, j, i)
{
    var oldSun = islandLive.getSun(j, i);
    var newSun = islandLive.addSun(j, i);
    var cellSelector = getCellSelector(step, j, i);
    var sunSelector = cellSelector + " .sun";
    $(sunSelector).addClass('sun_'+newSun);
    $(sunSelector).removeClass('sun_'+oldSun);
}

function rainChange(step, j, i)
{
    var oldRain = islandLive.getRain(j, i);
    var newRain = islandLive.addRain(j, i);
    var cellSelector = getCellSelector(step, j, i);
    var rainSelector = cellSelector + " .rain";
    $(rainSelector).addClass('rain_'+newRain);
    $(rainSelector).removeClass('rain_'+oldRain);
}


function menu(step, j, i, evt) {
    // Блокируем всплывание события contextmenu
    evt = evt || window.event;
    evt.cancelBubble = true;
    // Показываем собственное контекстное меню
    var menu = document.getElementById("contextMenuId");
    var html = "";

    html = "<button class='button' onclick='landscapeChange("+step+", "+ j +", " + i +");'>Сменить ландшафт</button><br>";
    html += "<button class='button' onclick='grassChange("+step+", "+ j +", " + i +");'>Изменить траву</button><br>";
    html += "<button class='button' onclick='rabbitChange("+step+", "+ j +", " + i +");'>Изменить кроликов</button><br>";
    html += "<button class='button' onclick='sunChange("+step+", "+ j +", " + i +");'>Изменить солнце</button><br>";
    html += "<button class='button' onclick='rainChange("+step+", "+ j +", " + i +");'>Изменить дождь</button><br>";
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

