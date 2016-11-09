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
</body>
</html>
