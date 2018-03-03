
let index = {
    init: callback => {
        var num = 100
        var theThing = null

        var replaceThing = function () {
            if (num <=0) {
               
                 callback && callback()
             }
            num--
            var originalThing = theThing
            var unused = function () {
                if (originalThing)
                    console.log("hi")
            }
            theThing = {
                longStr: new Array(1000000).join('*'),
                someMethod: function someMethod() {
                    console.log('someMessage')
                }
            };
        };
        setInterval(replaceThing,10)
    }
}

module.exports = index 