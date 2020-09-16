let utils = require('../utils')

// node  --expose-gc node_modules/jest/bin/jest.js -ot global
it('global_window 无内存泄露', function(done){
   
    let global_window_true = require('../global_window_true.js')
    console.log('global_window_true 启动时内存占用: ' + utils.get_memory())
    global_window_true.init()
    global.gc()
    setTimeout(function(){ //加个延迟, 不然rss可能还没回收完毕
        console.log('global_window_true 结束时内存占用: ' + utils.get_memory())
        done()
    }, 0)
    
})

it('global_window 有内存泄露', function(done){
   
    let global_window_false = require('../global_window_false.js')
    console.log('global_window_false 启动时内存占用: ' + utils.get_memory())
    global_window_false.init()
    global.gc()
     setTimeout(function(){//加个延迟, 不然rss可能还没回收完毕
         console.log('global_window_false 结束时内存占用: ' + utils.get_memory())
        done()
    }, 0)
   
})

//node  --expose-gc node_modules/jest/bin/jest.js -ot 闭 包
it('闭包引用 有内存泄露', function(done){
    //jest.useFakeTimers()
    global.is_jest = true
    let bibao = require('../bibao.js')
    global.gc()
    console.log('闭包引用 启动时内存占用: ' + utils.get_memory())
    bibao.init()
    //jest.runTimersToTime(3000)
    
    //jest.clearAllTimers()
    
    setTimeout(function(){
        //bibao.clear_interval()
        global.gc()
        console.log('闭包引用 结束时内存占用: ' + utils.get_memory())
        done()
    }, 4000)
    
    
   
})

it('闭包引用2 有内存泄露', function(done){
    //jest.useFakeTimers()
    global.is_jest = true
     global.gc()
    console.log('闭包引用 启动时内存占用: ' + utils.get_memory())
    let bibao = require('../bibao_test.js')
   
   
    //jest.runTimersToTime(3000)
    
    //jest.clearAllTimers()
    
    setTimeout(function(){
        //bibao.clear_interval()
        global.gc()
        console.log('闭包引用 结束时内存占用: ' + utils.get_memory())
        done()
    }, 4000)
    
    
   
})