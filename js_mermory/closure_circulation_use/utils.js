let utils = {
    get_memory: () => {
        let menory_obj =  process.memoryUsage(),
            rss = utils.handle_filesize(menory_obj.rss),
            heapTotal = utils.handle_filesize(menory_obj.heapTotal),
            heapUsed = utils.handle_filesize(menory_obj.heapUsed)

        return `进程常驻内存:  ${rss}, 已申请的堆内存: ${heapTotal}, 已使用的内存: ${heapUsed}`
    },
    handle_filesize: byte => {
        
        if (typeof byte === 'object') {
            let string = ''
            for( let key in byte ) {

                byte[key] = utils.handle_filesize(byte[key])
            }
            return byte
        }
        if ( isNaN(byte) || byte == '' ) return byte
        if ( byte < 0 ) return ''
        if (byte == 0) return '0 B'
        var k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(byte) / Math.log(k))
        var val = (byte / Math.pow(k, i))
        var size = val.toPrecision(3)
        if (999 < val && val < 1000) {
            size = val.toFixed(0)
        }
        return size + ' ' + sizes[i]
    }
}
module.exports = utils