<?php
/**
 * Created by IntelliJ IDEA.
 * User: Мария
 */

/**
 *
 * 1. Имеется остров, состоящий из квадратов. На острове находятся поле, горы или река (озеро).
 * Каждый квадрат целиком занят местностью одного из этих видов.
 * Время движется по тактам.
 * За один такт на каждом квадрате может идти дождь и светить солнце, и как следствие – растет сочная трава.
 * Интенсивность дождя и солнца меняются случайным образом от 0 до 3 единиц.
 * При ливне солнца быть не может, а при жгучем солнце нет дождя.
 * Трава имеет сочность от 0 до 5 единиц. При росте травы сочность увеличивается на 1 за такт, при высыхании уменьшается на 1.
 * Вокруг озера или реки трава растет всегда, когда есть солнце, даже если дождь не идет. В горах трава не растет.
 * В начальный момент времени на острове травы нет.
 * Зависимость роста травы от дождя и солнца указаны в таблице.
 */

class IslandLive
{
    public static $types = array(
        "field",
        "mountain",
        "river"
    );

    //x -> sun,
    //y -> rain, //0...3
    //что происходит с травой при разной интенсивности дождя и солнца
    public static $weather = array(
        array(0, 0, 0, -1),
        array(0, 1, 1, 0),
        array(0, 1, 1, 1),
        array(-1, 0, 1, 1)
    );

    private $island = array();
    private $columns = 10; // x
    private $rows = 10; // y
    private $i = 0; // current tact number


    private $current_state = array();

    function __construct()
    {
        for ($j = 0; $j < $this->rows; $j++)
        {
            for ($i = 0; $i < $this->columns; $i++)
            {
                $this->island[$j][$i]["landscape"] = self::$types[array_rand(self::$types)]; // will constant
                if ($this->island[$j][$i]["landscape"] == self::$types[1] || $this->island[$j][$i]["landscape"] == self::$types[2])
                {
                    $this->island[$j][$i]["grass"] = false; // not will change
                }
                else
                {
                    $this->island[$j][$i]["grass"] = 1; // will change  0...5 in depending on sun and rain and landscapes
                }
            }
        }
        $this->current_state = $this->island;
    }

    public function GetIsland()
    {
        return $this->island;
    }

    public function GetCurrentState()
    {
        return $this->current_state;
    }

    public function GetRows()
    {
        return $this->rows;
    }

    public function GetColumns()
    {
        return $this->columns;
    }

    /*public function tactIsland()
    {
        $this->i++;
        //TODO: пройти по острову и в зависимости от натсроек  составить новое состояние
        for ($j = 0; $j < $this->rows; $j++)
        {
            for ($i = 0; $i < $this->columns; $i++)
            {
                $island[$j][$i]["sun"] = 0;
                $island[$j][$i]["rain"] = 0;
                $island[$j][$i]["grass"] = 0;
            }
        }
        return $this->island;
    }
*/
    /**
     * Get Next $count states on island
     */
    public function GetStates($count)
    {
        $states = array();
        for ($index = 0; $index < $count; $index++)
        {
            $this->i++;
            //TODO: пройти по острову и в зависимости от натсроек  составить новое состояние
            for ($j = 0; $j < $this->rows; $j++)
            {
                for ($i = 0; $i < $this->columns; $i++)
                {
                    $this->current_state[$j][$i]["sun"] = rand(0,3); // will change rand 0...3
                    $this->current_state[$j][$i]["rain"] = rand(0,3); // will change rand 0...3
                    if ($this->current_state[$j][$i]["grass"] !== false)
                    {
                        $grassStep = self::$weather[$this->current_state[$j][$i]["rain"]][$this->current_state[$j][$i]["sun"]];
                        if ($this->current_state[$j][$i]["grass"] == 5 && $grassStep == 1)
                        {
                            $this->current_state[$j][$i]["grass"] = 5;
                        }
                        elseif ($this->current_state[$j][$i]["grass"] == 0 && $grassStep == -1)
                        {
                            $this->current_state[$j][$i]["grass"] = 0;
                        }
                    }

                }
            }
            $states[] = $this->current_state;
        }
        return $states;
    }
}