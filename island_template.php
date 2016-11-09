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
                    <span class="cell <?=$landscape?>">
                        <span class="sun <?=$sunClass?>"></span>
                        <span class="rain <?=$rainClass?>"></span>
                        <span class="grass <?=$grassClass?>"></span>
                    </span>
                    <?
                    //context.drawImage(that._islandConst['images'][landscape], i*that._itemWidth, j*that._itemHeight);
                    //if ($grass !== false && $grass > 0)
                    {
                        //context.drawImage(that._islandConst['images']['grass'], i*that._itemWidth, j*that._itemHeight + that._itemHeight - that._islandConst['images']['grass'].height);
                    }
                    ?>
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