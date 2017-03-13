module.exports = function (src, off, lim) {
    lim = lim == null ? src.length : lim
    var i = off || 0
    if (i >= lim) { return [] }

    var ret = []
    while (i < lim) {
        while (src[i] < 0x80) { if (++i === lim) return ret }       // skip ascii

        // non-ascii (2 or more bytes)
        var start = i
        var c = src[i++]
        if (c >= 0xC0) {
            // trailing bytes
            for (var n = 2; (c << n) & 0x80; n++) {}                // count sequential 1's: 11xxxxxx
            while (i < lim && (src[i] & 0xC0) === 0x80) { i++ }     // skip trailing bytes
            if (i - start !== n) {
                if (i - start > n) {
                    ret.push([start + n, i])                        // excess trailing bytes
                } else {
                    ret.push([start, i])                            // not enough trailing bytes
                }
            }
        } else {
            // unexpected trailing byte
            while (i < lim && (src[i] & 0xC0) === 0x80) { i++ }     // skip all trailing bytes
            ret.push([start, i])
        }
    }
    return ret
}
