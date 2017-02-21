# qb-utf8-illegal-bytes(buffer, options)

## Install

    npm install qb-utf8-illegal-bytes

## illegal_bytes(buffer, options) 

Return locations of non-legal UTF-8 encoded bytes in the <code>buffer</code>
as begin/end index tuples.

    buffer:     an array or array-like object containing byte values (integers in the range 0-255)
    options:    
        beg:    inclusive index to begin checking (defaults to 0) 
        end:    exclusive index to end checking (defaults to buffer.length) 
        
## Example

    var illegal_bytes = require( 'qb-utf8-illegal-bytes' );
    
    var buf = [0x61, 0x62, 0xF0, 0x83, 0x63, 0x64, 0xC2];
    console.log( illegal_bytes( buf ) );
    
    > [ [2,4], [6,7] ]
 

    console.log( illegal_bytes( buf, { beg: 3 } ) );  // start at offset 3 ( byte 0x83 )
    
    > [ [3,4], [6,7] ]
