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
        [ 'buf',  'opt',               'exp'   ],
        [  buf,    null,               []      ],
        [  buf,    {beg:0},            []      ],
        [  buf,    {end:4},            []      ],
        [  buf,    {beg:0,end:0},      []      ],
        [  buf,    {beg:4,end:4},      []      ],
        [  buf,    {beg:0,end:4},      []      ],
        [  buf,    {beg:1,end:4},      []      ],
        [  buf,    {beg:2,end:4},      [[2,3]] ],
        [  buf,    {beg:3,end:4},      []      ],
        [  buf,    {beg:4,end:4},      []      ],
        [  buf,    {beg:0,end:0},      []      ],
        [  buf,    {beg:0,end:1},      []      ],
        [  buf,    {beg:0,end:2},      [[1,2]] ],
        [  buf,    {beg:0,end:3},      []      ],
    ], illegal_bytes)
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


