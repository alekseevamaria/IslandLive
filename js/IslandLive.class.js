var IslandLive = Base.extend({

    TYPES: [
        "field",
        "mountain",
        "river"
    ],

    //x -> sun,
    //y -> rain, //0...3
    //что происходит с травой при разной интенсивности дождя и солнца
    WEATHER: [
        [0, 0, 0, -1],
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [-1, 0, 1, 1]
    ],

    _island: [],
    _columns: 5, // x
    _rows: 5, // y
    _i: 0,

    _current_state: [],

    constructor: function(rows, columns)
    {
        this._columns = (rows) ? rows : 5; // x
        this._rows = (columns) ? columns : 5; // y
        for (var j = 0; j < this._rows; j++)
        {
            var row = [];
            for (var i = 0; i < this._columns; i++)
            {
                var column = [];
                column["landscape"] = this.TYPES[getRandomInt(0, 2)]; // will constant
                if (column["landscape"] == this.TYPES[1] || column["landscape"] == this.TYPES[2])
                {
                    column["grass"] = false; // not will change
                    column["rabbit"] = false; // not will change
                }
                else
                {
                    column["grass"] = 0; // will change  0...5 in depending on sun and rain and landscapes
                    column["rabbit"] = getRandomInt(0,1); // will change  0...3
                }
                column["sun"] = getRandomInt(0,3); // will change rand 0...3
                column["rain"] = getRandomInt(0,3); // will change rand 0...3

                if (column["rain"] == 3)
                {
                    column["sun"] = 0;
                }
                if (column["sun"] == 3)
                {
                    column["rain"] = 0;
                }
                row[i] = column;
            }
            this._island[j] = row;
        }
        this._current_state = this._island;

        this.recalcNearWater();
    },

    GetCurrentState: function()
    {
        return this._current_state;
    },

    GetRows: function()
    {
        return this._rows;
    },

    GetColumns: function()
    {
        return this._columns;
    },

    GetStepsCount: function()
    {
        return this._i;
    },

    getLandscape: function(j, i)
    {
        return this._current_state[j][i]["landscape"];
    },

    getGrass: function(j, i)
    {
        return this._current_state[j][i]["grass"];
    },

    getRabbit: function(j, i)
    {
        return this._current_state[j][i]["rabbit"];
    },

    changeLandscape: function(j, i)
    {
        var oldLandscape = this._current_state[j][i]["landscape"];
        var newLandscape = "field";
        if (oldLandscape == "field")
        {
            newLandscape = "mountain";
        }
        else if (oldLandscape == "mountain")
        {
            newLandscape = "river";
        }
        this._current_state[j][i]["landscape"] = newLandscape;
        this.recalcNearWater();
        this.recalcGrassAvailable(j, i);
        this.recalcRabbitAvailable(j, i);

        return newLandscape;
    },

    changeGrass: function(j, i)
    {
        var oldGrass = this._current_state[j][i]["grass"];
        var newGrass = 4;
        if (oldGrass == 5)
        {
            newGrass = 0;
        }
        else
        {
            newGrass = oldGrass + 1;
        }
        this._current_state[j][i]["grass"] = newGrass;
        return newGrass;
    },

    addRabbit: function(j, i)
    {
        var oldRabbit = this._current_state[j][i]["rabbit"];
        var newRabbit = false;
        if (oldRabbit < 3)
        {
            newRabbit++;
        }
        this._current_state[j][i]["rabbit"] = newRabbit;
        return newRabbit;
    },

    deleteRabbit: function(j, i)
    {
        var oldRabbit = this._current_state[j][i]["rabbit"];
        var newRabbit = false;
        if (oldRabbit > 0)
        {
            newRabbit--;
        }
        this._current_state[j][i]["rabbit"] = newRabbit;
        return newRabbit;
    },

    recalcNearWater: function()
    {
        for (j = 0; j < this._rows; j++)
        {
            for (i = 0; i < this._columns; i++)
            {
                this._current_state[j][i]['isNearWater'] = false;
                if (j > 0 && this._current_state[j-1][i]["landscape"] =='river')
                {
                    this._current_state[j][i]['isNearWater'] = true;
                }
                if (i > 0 && this._current_state[j][i-1]["landscape"] == 'river')
                {
                    this._current_state[j][i]['isNearWater'] = true;
                }
                if (j < this._rows-1 && this._current_state[j+1][i]["landscape"] == 'river')
                {
                    this._current_state[j][i]['isNearWater'] = true;
                }
                if (i+1 < this._columns && this._current_state[j][i+1]["landscape"] == 'river')
                {
                    this._current_state[j][i]['isNearWater'] = true;
                }
            }
        }
    },

    recalcGrassAvailable: function(j, i)
    {
        if (this._current_state[j][i]["landscape"] == this.TYPES[1] || this._current_state[j][i]["landscape"] == this.TYPES[2])
        {
            this._current_state[j][i]["grass"] = false; // not will change
        }
        else
        {
            this._current_state[j][i]["grass"] = 0; // will change  0...5 in depending on sun and rain and landscapes
        }
    },

    recalcRabbitAvailable: function(j, i)
    {
        if (this._current_state[j][i]["landscape"] == this.TYPES[1] || this._current_state[j][i]["landscape"] == this.TYPES[2])
        {
            this._current_state[j][i]["rabbit"] = false; // not will change
        }
        else
        {
            this._current_state[j][i]["rabbit"] = 0; // will change  0...5 in depending on sun and rain and landscapes
        }
    },

    calcGrassStep: function(j, i)
    {
        if (this._current_state[j][i]["grass"] !== false)
        {
            var grassStep = this.WEATHER[this._current_state[j][i]["rain"]][this._current_state[j][i]["sun"]];

            if (this._current_state[j][i]["grass"] == 5 && grassStep == 1)
            {
                this._current_state[j][i]["grass"] = 5;
            }
            else if (this._current_state[j][i]["grass"] == 0 && grassStep == -1)
            {
                this._current_state[j][i]["grass"] = 0;
            }
            else
            {
                if (this._current_state[j][i]["sun"] != 0 && this._island[j][i]['isNearWater'])
                {
                    this._current_state[j][i]["grass"] += 1;
                }
                else
                {
                    this._current_state[j][i]["grass"] += grassStep;
                }
            }
        }
    },

    calcRabbitStep: function(j, i)
    {
        if (this._current_state[j][i]["rabbit"] !== false)
        {
            if (this._current_state[j][i]["rabbit"] == 2)
            {
                this._current_state[j][i]["rabbit"]++;
            }
            else if (this._current_state[j][i]["rabbit"] > 0 && this._current_state[j][i]["grass"] < this._current_state[j][i]["rabbit"])
            {
                //найти в соседних траву, если нет до убить кролика.
                var nearGrass = [];
                var nearGrassCount = 0;
                if (j > 0 && this._current_state[j-1][i]["grass"] > 0 && this._current_state[j-1][i]["rabbit"] < 3)
                {
                    nearGrass.push([j-1, i]);

                    nearGrassCount += this._current_state[j-1][i]["grass"];
                }
                if (i > 0 && this._current_state[j][i-1]["grass"] > 0 && this._current_state[j][i-1]["rabbit"] < 3)
                {
                    nearGrass.push([j, i-1]);
                    nearGrassCount += this._current_state[j][i-1]["grass"];
                }
                if (j < this._rows-1 && this._current_state[j+1][i]["grass"] > 0 && this._current_state[j+1][i]["rabbit"] < 3)
                {
                    nearGrass.push([j+1, i]);
                    nearGrassCount += this._current_state[j+1][i]["grass"];
                }
                if (i+1 < this._columns && this._current_state[j][i+1]["grass"] > 0 && this._current_state[j][i+1]["rabbit"] < 3)
                {
                    nearGrass.push([j, i+1]);
                    nearGrassCount += this._current_state[j][i+1]["grass"];
                }

                if (nearGrassCount > 0)
                {
                    /*распрдеить по соседним лишних кроликов*/
                    var movingRabbits = this._current_state[j][i]["rabbit"] - this._current_state[j][i]["grass"];

                    for (var i = 0; i < nearGrassCount, i < movingRabbits; i++)
                    {
                        this._current_state[nearGrass[i][0]][nearGrass[i][1]]["rabbit"]++;
                    }
                }
                this._current_state[j][i]["rabbit"] = this._current_state[j][i]["grass"];
                this._current_state[j][i]["grass"] = 0;
            }
            else if (this._current_state[j][i]["rabbit"] > 0 && this._current_state[j][i]["grass"] >= this._current_state[j][i]["rabbit"])
            {
                this._current_state[j][i]["grass"] -= this._current_state[j][i]["rabbit"];
            }
        }
    },

    step: function()
    {
        this._i++;
        //TODO: пройти по острову и в зависимости от натсроек  составить новое состояние
        for (var j = 0; j < this._rows; j++)
        {
            for (var i = 0; i < this._columns; i++)
            {
                this.calcRabbitStep(j, i);
                this.calcGrassStep(j, i);

                this._current_state[j][i]["sun"] = getRandomInt(0,3); // will change rand 0...3
                this._current_state[j][i]["rain"] = getRandomInt(0,3); // will change rand 0...3

                if (this._current_state[j][i]["rain"] == 3)
                {
                    this._current_state[j][i]["sun"] = 0;
                }
                if (this._current_state[j][i]["sun"] == 3)
                {
                    this._current_state[j][i]["rain"] = 0;
                }
            }
        }
        return this._current_state;
    },

    /**
     * Get Next count states on island
     */
    GetStates: function(count)
    {
        var states = [];
        for (var index = 0; index < count; index++)
        {
            states.push(this.step());
        }
        return states;
    },

    getHtml: function() {
        console.log(this._i);
        var islandHtml = "";
        islandHtml += '<table border="0" class="island_state island_state_'+this._i+'"><tbody>';
        for (var j = 0; j < this._current_state.length; j++)
        {
            islandHtml += '<tr class="row_'+j+'">';
                for (var i = 0; i < this._current_state[j].length; i++)
                {
                    islandHtml += '<td class="column_'+i+'">';

                    var landscape = this._current_state[j][i]['landscape'];
                    var sun = this._current_state[j][i]['sun'];
                    var sunClass = (sun) ? "sun_" + sun : '';
                    var rain = this._current_state[j][i]['rain'];
                    var rainClass = (rain) ? "rain_" + rain : '';
                    var grass = this._current_state[j][i]['grass'];
                    var grassClass = (grass) ? "grass_" + grass : '';
                    var rabbit = this._current_state[j][i]['rabbit'];
                    var rabbitClass = (rabbit) ? "rabbit_" + rabbit : '';
                    islandHtml += '<span class="cell ' + landscape + '" oncontextmenu="return menu('+this._i+', '+j+', '+i+', event);">';
                    islandHtml += '<span class="sun ' + sunClass + '"></span><span class="rain '+rainClass+'"></span><span class="grass '+grassClass+'"></span>';
                    islandHtml += '<span class="rabbit '+rabbitClass+'"></span>';
                    islandHtml += '</span></td>';

                }

            islandHtml += '</tr>';
        }
        islandHtml += '</tbody></table>';
        return islandHtml;
    }

}, {

});