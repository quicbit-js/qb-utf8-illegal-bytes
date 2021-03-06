# qb-utf8-illegal-bytes

[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![dependencies][proddep-image]][proddep-link]
[![dev dependencies][devdep-image]][devdep-link]
[![code analysis][code-image]][code-link]

[npm-image]:       https://img.shields.io/npm/v/qb-utf8-illegal-bytes.svg
[downloads-image]: https://img.shields.io/npm/dm/qb-utf8-illegal-bytes.svg
[npm-url]:         https://npmjs.org/package/qb-utf8-illegal-bytes
[proddep-image]:   https://www.bithound.io/github/quicbit-js/qb-utf8-illegal-bytes/badges/dependencies.svg
[proddep-link]:    https://www.bithound.io/github/quicbit-js/qb-utf8-illegal-bytes/master/dependencies/npm
[devdep-image]:    https://www.bithound.io/github/quicbit-js/qb-utf8-illegal-bytes/badges/devDependencies.svg
[devdep-link]:     https://www.bithound.io/github/quicbit-js/qb-utf8-illegal-bytes/master/dependencies/npm
[code-image]:      https://www.bithound.io/github/quicbit-js/qb-utf8-illegal-bytes/badges/code.svg
[code-link]:       https://www.bithound.io/github/quicbit-js/qb-utf8-illegal-bytes

Compact and vary fast function that returns locations of non-legal UTF-8 encoded bytes in an array of
bytes (array or typed array holding integer values 0-255)

**Complies with the 100% test coverage and minimum dependency requirements** of 
[qb-standard](http://github.com/quicbit-js/qb-standard) . 

## Install

    npm install qb-utf8-illegal-bytes
    
## API Change 1.x -> 2.x

The 2.0 API has been updated to comply with standard parameters 'src', 'off' and 'lim'
in the glossary (rather than the previous opt.beg, opt.enc).  We will be using this
approach for array-like inputs throughout quicbit libraries.

## illegal_bytes([src][src-link], [off][off-link], [lim][lim-link])

Return locations of non-legal UTF-8 encoded bytes in a [src][src-link] array or array-like
object of bytes (integers 0-255).  Start checking at the [off][off-link] (defaults to 0)
and ending before the optional [lim][off-link] (defaults to src.length).
Resulting ranges are returned as an array of \[off, lim\] pairs where
again, off is inclusive and lim is exclusive.

[src-link]: https://github.com/quicbit-js/qb-standard/blob/master/doc/variable-glossary.md#src-source
[off-link]: https://github.com/quicbit-js/qb-standard/blob/master/doc/variable-glossary.md#off-offset
[lim-link]: https://github.com/quicbit-js/qb-standard/blob/master/doc/variable-glossary.md#lim-limit

        
## Example

    var illegal_bytes = require( 'qb-utf8-illegal-bytes' )
    
    var src = [0x61, 0x62, 0xF0, 0x83, 0x63, 0x64, 0xC2]        // alternatively, this can be a node Buffer or Uint8Array
    console.log( illegal_bytes( src ) )
    
    > [ [2,4], [6,7] ]
 
...which shows that bytes at offsets 2, 3 and 6 are illegal 

    console.log( illegal_bytes( src, 3 ) );  // start at offset 3 ( byte 0x83 )
    
    > [ [3,4], [6,7] ]
    
...which shows that bytes at offsets 3 and 6 are illegal 
