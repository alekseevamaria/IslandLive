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
    <script type="text/javascript" src="js/lib.js"></script>
    <script type="text/javascript" src="js/IslandLive.class.js"></script>
    <script type="text/javascript" src="js/init.js"></script>

</head>
<body>
    <div>
        <button id="step" style="width: auto;">Шаг</button>
        <input type="text" id="stepInterval" value="1000"/>
        <button id="auto" style="width: auto;">Автоматически</button>
        <button id="stop" style="width: auto;">Стоп</button>
    </div>
    <div>
        <div class="island-container"></div>
        <script type="text/javascript">

        </script>
    </div>

    <!-- Контер для собственного контекстного меню. По умолчания - скрыт. -->
    <div id="contextMenuId" style="position:absolute; top:0; left:0; border:1px solid #666; background-color:#CCC; display:none; float:left;"></div>
</body>
</html>
