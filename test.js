var test = require('test-kit').tape()
var illegal_bytes = require('.')

test('illegal_bytes options', function(t) {
    var buf = [
        0x61,       // 'a'
        0xC3,       // 'é' - 2 bytes
        0xA9,
        0x62,       // 'b'
    ]
    t.tableAssert([
        [ 'beg',   'end',     'exp' ],
        [ null,    null,      []    ],
        [ 0,       null,      []    ],
        [ null,    4,         []    ],
        [ 0,       0,         []    ],
        [ 4,       4,         []    ],
        [ 0,       4,         []    ],
        [ 1,       4,         []    ],
        [ 2,       4,         [[2,3]] ],
        [ 3,       4,         []    ],
        [ 4,       4,         []    ],
        [ 0,       0,         [] ],
        [ 0,       1,         [] ],
        [ 0,       2,         [[1,2]] ],
        [ 0,       3,         [] ],
    ], function(beg, end) {
        if(beg != null || end != null) {
            return illegal_bytes(buf, {beg: beg, end: end})
        } else {
            return illegal_bytes(buf)
        }
    })
})

test('illegal_bytes', function(t) {
    t.tableAssert([
        [ 'buf',                                                                            'exp' ],
        // all short
        [ [0xF0, 0xE0, 0xC0 ],                                            [ [0,1], [1,2], [2,3] ] ],
        [ [0xF0, 0x61, 0xE0, 0x62, 0xC0 ],                                [ [0,1], [2,3], [4,5] ] ],
        // no leads
        [ [0xA7, 0xA8, 0xA9 ],                                            [ [0,3] ]               ],
        [ [0xA7, 0x61, 0xA8, 0x62, 0xA9 ],                                [ [0,1], [2,3], [4,5] ] ],
        [ [0x61, 0x62, 0x63, 0xA7, 0x61, 0x62 ],                          [ [3,4] ]               ],
        //  ok     short      ok   short     ok      xlead xlead  ok   xlead
        // ----  ----------  ----  ----  ----------  ----  ----- ----  ----
        [ [0x61, 0xF0, 0x90, 0x62, 0xC3, 0xC3, 0xA9, 0xA9, 0xA9, 0x63, 0xA9 ],  [ [1,3], [4,5], [7,9], [10,11]] ],
    ], illegal_bytes)
})


