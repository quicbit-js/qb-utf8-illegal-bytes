module.exports = function(buf, opt) {
    opt = opt || {}
    var i = opt.beg || 0
    var end = opt.end || buf.length
    var ret = []
    if(i >= end) { return [] }
    main: while(i < end) {
        while(buf[i] < 0x80) { if(++i === end) break main }   // skip ascii
        // non-ascii
        var start = i
        var c = buf[i++]
        if(c >= 0xC0) {
            for(var n=2; (c << n) & 0x80; n++)   {}        // count sequential 1's: 11xxxxxx
            while(i<end && (buf[i] & 0xC0) === 0x80) {i++}   // skip trailing bytes
            if(i-start !== n) {
                if(i-start > n) {
                    ret.push([start + n, i])    // excess trailing bytes
                } else {
                    ret.push([start, i])        // not enough trailing bytes
                }
            }
        } else {
            // unexpected trailing byte
            while(i<end && (buf[i] & 0xC0) === 0x80) {i++}
            ret.push([start, i])                // skip all trailing bytes
        }
    }
    return ret
}