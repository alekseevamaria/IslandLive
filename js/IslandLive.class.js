var IslandLive = Base.extend({

    _island: [],
    _columns: 5, // x
    _rows: 5, // y
    _i: [],

    _current_state: [],

    constructor: function(rows, columns)
    {
        this._columns = (rows) ? rows : 5; // x
        this._rows = (columns) ? columns : 5; // y
        for (var j = 0; j < this._rows; j++)
        {
            for (var i = 0; i < this._columns; i++)
            {
                this._island[j][i]["landscape"] = self.TYPES[getRandomArbitrary(0, 2)]; // will constant
                if (this._island[j][i]["landscape"] == self.TYPES[1] || this._island[j][i]["landscape"] == self.TYPES[2])
                {
                    this._island[j][i]["grass"] = false; // not will change
                }
            else
                {
                    this._island[j][i]["grass"] = 0; // will change  0...5 in depending on sun and rain and landscapes
                }
                this._island[j][i]["sun"] = getRandomArbitrary(0,3); // will change rand 0...3
                this._island[j][i]["rain"] = getRandomArbitrary(0,3); // will change rand 0...3

            }
        }

        for (j = 0; j < this._rows; j++)
        {
            for (i = 0; i < this._columns; i++)
            {
                this._island[j][i]['isNearWater'] = false;
                if (j > 0 && this._island[j-1][i]["landscape"] =='river')
                {
                    this._island[j][i]['isNearWater'] = true;
                }
                if (i > 0 && this._island[j][i-1]["landscape"] == 'river')
                {
                    this._island[j][i]['isNearWater'] = true;
                }
                if (j < this._rows-1 && this._island[j+1][i]["landscape"] == 'river')
                {
                    this._island[j][i]['isNearWater'] = true;
                }
                if (i+1 < this._columns && this._island[j][i+1]["landscape"] == 'river')
                {
                    this._island[j][i]['isNearWater'] = true;
                }
            }
        }

        this._current_state = this._island;
    },

    GetIsland: function()
    {
        return this._island;
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

    /**
     * Get Next count states on island
     */
    GetStates: function(count)
    {
        var states = [];
        for (var index = 0; index < count; index++)
        {
            this._i++;
            //TODO: пройти по острову и в зависимости от натсроек  составить новое состояние
            for (var j = 0; j < this._rows; j++)
            {
                for (var i = 0; i < this._columns; i++)
                {

                    if (this._current_state[j][i]["rain"] == 3)
                    {
                        this._current_state[j][i]["sun"] = 0;
                    }
                    if (this._current_state[j][i]["sun"] == 3)
                    {
                        this._current_state[j][i]["rain"] = 0;
                    }

                    if (this._current_state[j][i]["grass"] !== false)
                    {
                        var grassStep = self.WEATHER[this._current_state[j][i]["rain"]][this._current_state[j][i]["sun"]];

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

                    this._current_state[j][i]["sun"] = getRandomArbitrary(0,3); // will change rand 0...3
                    this._current_state[j][i]["rain"] = getRandomArbitrary(0,3); // will change rand 0...3
                }
            }
            states.push(this._current_state);
        }
        return states;
    }

}, {
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
    ]
});

// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}