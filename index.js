module.exports = function(buf, opt) {
    opt = opt || {}
    var i = opt.beg || 0
    var end = opt.end || buf.length
    var ret = []
    if(i >= end) { return [] }
    while(i < end) {
        var start = i
        if(buf[i] >= 0xC0) {
            for(var n=2; (buf[i] << n) & 0x80; n++)   {}    // count sequential 1's: 11xxxxxx
            while(i<end && (buf[++i] & 0xC0) === 0x80) {}   // skip trailing bytes
            if(n !== i-start) {
                ret.push([start, i])
            }
        } else if(buf[i] >= 0x80) {
            // unexpected trailing byte
            while(i<end && (buf[++i] & 0xC0) === 0x80) {}   // skip trailing bytes
            ret.push([start, i])
        } else {
            i++     // ascii
        }
    }
    return ret
}