let global_window = {
    init: () => {
        let a = []
        //window.a = []
        for (var i = 0; i < 300; i++) {
            a[i] = new Array(1000000).join('*')
        }
    }
}
//global_window.init()

module.exports = global_window