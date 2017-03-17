var test = require('test-kit').tape()
var illegal_bytes = require('.')

test('illegal_bytes options', function (t) {
    var buf = [
        0x61,       // 'a'
        0xC3,       // 'é' - 2 bytes
        0xA9,
        0x62,       // 'b'
    ]
    t.tableAssert([
        [ 'buf',                                 'off',  'lim',               'exp'             ],

        // all short
        [ [ 0xF0, 0xE0, 0xC0 ],                    null,   null,       [ [0,1], [1,2], [2,3] ] ],
        [ [ 0xF0, 0x61, 0xE0, 0x62, 0xC0 ],        null,   null,       [ [0,1], [2,3], [4,5] ] ],
        [ [ 0xF0, 0x61, 0xE0, 0x62, 0xC0 ],        1,      null,       [ [2,3], [4,5] ]        ],
        [ [ 0xF0, 0x61, 0xE0, 0x62, 0xC0 ],        1,      5,          [ [2,3], [4,5] ]        ],
        [ [ 0xF0, 0x61, 0xE0, 0x62, 0xC0 ],        1,      4,          [ [2,3] ]               ],
        [ [ 0xF0, 0x61, 0xE0, 0x62, 0xC0 ],        1,      3,          [ [2,3] ]               ],
        [ [ 0xF0, 0x61, 0xE0, 0x62, 0xC0 ],        1,      2,          []                      ],

        // no leads
        [ [ 0xA7, 0xA8, 0xA9 ],                    null,   null,      [ [0,3] ]               ],
        [ [ 0xA7, 0xA8, 0xA9 ],                    1,      null,      [ [1,3] ]               ],
        [ [ 0xA7, 0xA8, 0xA9 ],                    2,      null,      [ [2,3] ]               ],
        [ [ 0xA7, 0xA8, 0xA9 ],                    3,      null,      []                      ],
        [ [ 0xA7, 0xA8, 0xA9 ],                    null,   2,         [ [0,2] ]               ],
        [ [ 0xA7, 0x61, 0xA8, 0x62, 0xA9 ],        null,   null,      [ [0,1], [2,3], [4,5] ] ],
        [ [ 0x61, 0x62, 0x63, 0xA7, 0x61, 0x62 ],  null,   null,      [ [3,4] ]               ],

        // range tests
        [ buf,                                     null,   null,       []                      ],
        [ buf,                                     0,      null,       []                      ],
        [ buf,                                     null,   4,          []                      ],
        [ buf,                                     0,      0,          []                      ],
        [ buf,                                     4,      4,          []                      ],
        [ buf,                                     0,      4,          []                      ],
        [ buf,                                     1,      4,          []                      ],
        [ buf,                                     2,      4,          [[2,3]]                 ],
        [ buf,                                     3,      4,          []                      ],
        [ buf,                                     4,      4,          []                      ],
        [ buf,                                     0,      0,          []                      ],
        [ buf,                                     0,      1,          []                      ],
        [ buf,                                     0,      2,          [[1,2]]                 ],
        [ buf,                                     0,      3,          []                      ],

        // mixed tests
        //  ok     short      ok   short     ok      xlead xlead  ok   xlead
        // ----  ----------  ----  ----  ----------  ----  ----- ----  ----
        [ [ 0x61, 0xF0, 0x90, 0x62, 0xC3, 0xC3, 0xA9, 0xA9, 0xA9, 0x63, 0xA9 ], null, null, [ [1,3], [4,5], [7,9], [10,11] ] ],
    ], illegal_bytes)
})
