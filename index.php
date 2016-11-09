<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/island.css" rel="stylesheet" type="text/css">
    <title>Жизнь на острове</title>
    <script type="text/javascript" src="js/lib/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="js/lib/Base.js"></script>
    <script type="text/javascript" src="js/lib/handler.js"></script>
    <script type="text/javascript" src="js/IslandLive.class.js"></script>

</head>
<body>
    <div>
        <button id="step" style="width: auto;">Шаг</button>
        <input type="text" id="stepInterval" value="1000"/>
        <button id="auto" style="width: auto;">Автоматически</button>
        <button id="stop" style="width: auto;">Стоп</button>
    </div>
    <div>
    <?
        include_once("init.php");
        $islandStatesCount = 100;
        $islandLive = new IslandLive();
        $islandInit = $islandLive->GetIsland();
        $islandStates = $islandLive->GetStates($islandStatesCount);
    ?>
    <?
        include_once 'render_template.php';
        function renderIsland($island, $index)
        {
            render_template('island_template.php', array('ISLAND_STATE' => $island, 'ISLAND_STATE_INDEX' => $index));
        }
        renderIsland($islandInit, 0);
    ?>
    <?
    for ($i = 0; $i < $islandStatesCount; $i++)
    {
        renderIsland($islandStates[$i], $i+1);
    }
    ?>
    </div>
<script type="text/javascript">
    var i = 0;
    var island_state_Interval = null;
    function step(){
        i++;
        if ($('.island_state_' + (i-1)).length)
        {
            $('.island_state_' + (i-1)).hide();
        }
        if ($('.island_state_' + i).length)
        {
            $('.island_state_' + i).show();
        }
        if (i == <?=$islandStatesCount?>)
        {
            clearInterval(island_state_Interval);
        }
    };

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


</script>

    <script>
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

        function landscapeChange(j, i) {
            console.log($(".row_" + j + " .column_" + i + " .cell"));
        }

        function menu(j, i, evt) {
            // Блокируем всплывание события contextmenu
            evt = evt || window.event;
            evt.cancelBubble = true;
            // Показываем собственное контекстное меню
            var menu = document.getElementById("contextMenuId");
            var html = "";

            html = "<button onclick='landscapeChange("+ j +", " + i +");'>Сменить ландшафт</button>";
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
        addHandler(document, "contextmenu", function() {
            document.getElementById("contextMenuId").style.display = "none";
        });
        addHandler(document, "click", function() {
            document.getElementById("contextMenuId").style.display = "none";
        });
    </script>

    <!-- Контер для собственного контекстного меню. По умолчания - скрыт. -->
    <div id="contextMenuId" style="position:absolute; top:0; left:0; border:1px solid #666; background-color:#CCC; display:none; float:left;"></div>
</body>
</html>
