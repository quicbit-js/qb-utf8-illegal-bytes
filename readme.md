# qb-utf8-illegal-bytes(buffer, options)

## Install

    npm install qb-utf8-illegal-bytes

## illegal_bytes(buffer, options) 

Return locations of non-legal UTF-8 encoded bytes in the <code>buffer</code>
as begin/end index tuples.

    buffer:     an array or array-like object
    options:    
        beg:    (default 0) inclusive index to begin checking
        end:    (default buffer.length) exclusive index to end checking 
        
## Example

    var illegal_bytes = require( 'qb-utf8-illegal-bytes' );
    
    var buf = [0x61, 0x62, 0xF0, 0x83, 0x63, 0x64, 0xC2];
    console.log( illegal_bytes( buf ) );
    
    > [ [2,4], [6,7] ]
 

    console.log( illegal_bytes( buf, { beg: 3 } ) );
    
    > [ [3,4] ]
