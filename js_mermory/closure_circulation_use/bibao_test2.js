var theThing = null;
var run_num = 10;
var replaceThing = function () {
  if (run_num-- == 0){
    clearInterval(interval_id)
  }

  var originalThing = theThing;
  var unused = function () {
    if (originalThing) { }
     
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      
    }
  };
  //originalThing = null 
};


for (var i = 0; i < run_num; i++) {
  replaceThing()
}