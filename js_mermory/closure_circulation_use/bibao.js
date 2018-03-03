let bibao = {

  interval_id: null,
  init: function(){
    console.log(1)
    var theThing = null;
    var replaceThing = function () {
      var originalThing = theThing;
      var unused = function () {
          if (originalThing) {}
        };
        theThing = {
          longStr: new Array(1000000).join('*'),
          someMethod: function () {
            
          }
        };
        //originalThing = theThing = null
      };
    bibao.interval_id = setInterval(replaceThing, 40);
    /*for (var i = 0; i < 100; i++) {
      replaceThing()
    }*/

  },
  clear_interval: () => {
    if( bibao.interval_id){
      clearInterval(bibao.interval_id)
    }
  }
}

/*if ( typeof window === 'object'){
  bibao.init()
}*/
if (!global.is_jest){

 bibao.init()
}
module.exports = bibao