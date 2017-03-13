# qb-utf8-illegal-bytes(buffer, options)
# Standard - ESLint Shareable Config
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/qb-utf8-illegal-bytes.svg
[npm-url]: https://npmjs.org/package/qb-utf8-illegal-bytes
[downloads-image]: https://img.shields.io/npm/dm/qb-utf8-illegal-bytes.svg
[downloads-url]: https://npmjs.org/package/qb-utf8-illegal-bytes

## Install

    npm install qb-utf8-illegal-bytes
    
## API Update 1.x -> 2.x



## illegal_bytes(buffer, options) 

Return locations of non-legal UTF-8 encoded bytes in the <code>buffer</code>
as begin/end index tuples.

* [src]()
        src:    an array or array-like object containing byte values (integers in the range 0-255)
    options:    
        off:    inclusive index to begin checking (defaults to 0) 
        lim:    exclusive index to end checking (defaults to buffer.length) 
        
## Example

    var illegal_bytes = require( 'qb-utf8-illegal-bytes' );
    
    var buf = [0x61, 0x62, 0xF0, 0x83, 0x63, 0x64, 0xC2];
    console.log( illegal_bytes( buf ) );
    
    > [ [2,4], [6,7] ]
 

    console.log( illegal_bytes( buf, { off: 3 } ) );  // start at offset 3 ( byte 0x83 )
    
    > [ [3,4], [6,7] ]
