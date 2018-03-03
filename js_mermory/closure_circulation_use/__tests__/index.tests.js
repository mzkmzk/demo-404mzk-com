let utils = require('../utils')

it('a', function(done){
   
    let index = require('../index.js')
    console.log( utils.handle_filesize( process.memoryUsage() ) )
    
    index.init(function(){
        console.log(  utils.handle_filesize( process.memoryUsage() ) )   
        done()
    })
    
   
})

