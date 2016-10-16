<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/modalwindow.css" rel="stylesheet" type="text/css">
    <link href="css/colpick.css" rel="stylesheet" type="text/css"/>

    <title>Жизнь на острове</title>

    <script type="text/javascript" src="js/lib/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="js/lib/Base.js"></script>
    <script type="text/javascript" src="js/lib/handler.js"></script>
    <script type="text/javascript" src="js/lib/colpick.js"></script>

    <script type="text/javascript" src="js/isLeftMouseDown.js"></script>
    <script type="text/javascript" src="js/classes/Layer.class.js"></script>

    <script type="text/javascript" src="js/classes/tools/Tool.class.js"></script>
    <script type="text/javascript" src="js/classes/tools/Brush.class.js"></script>
    <script type="text/javascript" src="js/classes/tools/Pencil.class.js"></script>
    <script type="text/javascript" src="js/classes/tools/Eraser.class.js"></script>
    <script type="text/javascript" src="js/classes/tools/Figure.class.js"></script>
    <script type="text/javascript" src="js/classes/tools/Rectangle.class.js"></script>
    <script type="text/javascript" src="js/classes/tools/Ellipse.class.js"></script>

    <script type="text/javascript" src="js/classes/filters/Filter.class.js"></script>
    <script type="text/javascript" src="js/classes/filters/GaussianBlur.class.js"></script>
    <script type="text/javascript" src="js/classes/filters/EdgeDetection.class.js"></script>

    <script type="text/javascript" src="js/classes/Graphic.class.js"></script>
    <script type="text/javascript" src="js/classes/ImageFunctions.class.js"></script>
    <script type="text/javascript" src="js/classes/InitMenu.class.js"></script>
    <script type="text/javascript" src="js/classes/InitColorTools.class.js"></script>
    <script type="text/javascript" src="js/classes/InitStyleLists.class.js"></script>
    <script type="text/javascript" src="js/classes/InitTools.class.js"></script>

    <?php
    include_once("init.php");
    $islandLive = new IslandLive();
    $itemSidePixel = 50;
    $width = $itemSidePixel * $islandLive->GetColumns();
    $height = $itemSidePixel * $islandLive->GetRows();
    $islandInit = $islandLive->GetIsland();
    $islandStates = $islandLive->GetStates(1);
    ?>
    <script type="text/javascript">
        var islandInit = <?= json_encode($islandInit)?>;
    </script>
    <script type="text/javascript">
        var islandStates = <?= json_encode($islandStates)?>;
    </script>
    <script type="text/javascript">
        $(document).ready(function() {
            var initTools = new InitTools("layer", "subLayer", <?=$itemSidePixel?>, <?=$itemSidePixel?>, 3, <?=$islandLive->GetColumns()?>, <?=$islandLive->GetRows()?>);
            var graphic = initTools.getGraphic();
            graphic.resetColumnsRows();
            graphic.showInitState(islandInit);
            var i = 0;

            var graphicShowStateInterval = setInterval( function(){
                graphic.showState(islandStates[i]);
                i++;
                if (i== islandStates.length)
                {
                    clearInterval(graphicShowStateInterval);
                }
            }, 1000);
        });

        function setActiveBttn(buttonsClass, bttnId)
        {
            $("." + buttonsClass).each(function() {
                $(this).removeClass(Graphic.css_classes.BUTTON_ON);
            });
            $("#" + bttnId).addClass(Graphic.css_classes.BUTTON_ON);
        }
    </script>

</head>
<body>
<div class="nav hidden" >
    <div class="topNav">
        <ul>
            <li class="left"><a href="javascript:void(0)" id="fileMenuBtn">Файл</a></li>
            <li class="left"><a href="javascript:void(0)" id="mainMenuBtn">Главная</a></li>
            <li class="left"><a href="javascript:void(0)" id="filterMenuBtn">Фильтры</a></li>
            <li class="clear"></li>
        </ul>
    </div>
    <div class="tools" id="menu">
        <?php
        include("fileMenu.html");
        include("mainMenu.php");
        include("filterMenu.html");
        ?>
        <div class="clear"></div>
    </div>
</div>
<div class="contain">
    <div id="canvasContainer" class="canvas_container">
        <canvas id="layer" class="canvas"></canvas>
        <canvas id="subLayer" class="canvas"></canvas>
    </div>
</div>
<div id="preloaderOverlay" class="preloader_overlay">
    <img class="preloader" src="images/loader.gif" alt="preloader" title="preloader">
</div>
<div class="hidden">
    <img id="field_image" src="images/icons/field.jpg" alt="" width="<?=$itemSidePixel?>" height="<?=$itemSidePixel?>"/>
    <img id="mountain_image" src="images/icons/mountain.jpg" alt="" width="<?=$itemSidePixel?>" height="<?=$itemSidePixel?>"/>
    <img id="river_image" src="images/icons/river.jpg" alt="" width="<?=$itemSidePixel?>" height="<?=$itemSidePixel?>"/>
    <img id="grass_image" src="images/icons/grass.png" alt="" width="10" height="21"/>
    <img id="sun_image" src="images/icons/sun.png" alt="" width="10" height="10"/>
    <img id="rain_image" src="images/icons/rain.png" alt="" width="10" height="20"/>


</div>
</body>
</html>
