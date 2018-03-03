let set_interval = {
    init: () => {
        var data = new Array(1000000).join('*')
        setInterval(function(){
            global.innerHTML = JSON.stringify(data)
        }, 100)
    }
}
set_interval.init()

module.exports = set_interval