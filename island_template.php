<?
$islandState = $ISLAND_STATE;
?>
<table border="0" class="island_state island_state_<?=$ISLAND_STATE_INDEX?>">
    <tbody>
    <?php
    for ($j = 0; $j < count($islandState); $j++)
    {
        ?>
        <tr class="row_<?=$j?>">
            <?
            for ($i = 0; $i < count($islandState[$j]); $i++)
            {
                ?>
                <td class="column_<?=$i?>">
                    <?
                    $landscape = $islandState[$j][$i]['landscape'];
                    $sun = $islandState[$j][$i]['sun'];
                    $sunClass = ($sun) ? "sun_" . $sun : '';
                    $rain = $islandState[$j][$i]['rain'];
                    $rainClass = ($rain) ? "rain_" . $rain : '';
                    $grass = $islandState[$j][$i]['grass'];
                    $grassClass = ($grass) ? "grass_" . $grass : '';
                    ?>
                    <span class="cell <?=$landscape?>" oncontextmenu="return menu(<?=$j?>, <?=$i?>, event);">
                        <span class="sun <?=$sunClass?>"></span>
                        <span class="rain <?=$rainClass?>"></span>
                        <span class="grass <?=$grassClass?>"></span>
                    </span>
                </td>
            <?
            }
            ?>
        </tr>
    <?
    }
    ?>
    </tbody>
</table>

