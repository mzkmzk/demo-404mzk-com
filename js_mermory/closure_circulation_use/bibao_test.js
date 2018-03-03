//node --inspect-brk bibao_test.js
var theThing = null;
var run_num = 10;
var replaceThing = function () {
  if (run_num-- == 0){
    //clearInterval(interval_id) //'1'
  }

  var originalThing = theThing;
  var unused = function () {
    if (originalThing) { } // '2'
     
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      
    }
  };
  //originalThing = null //'3'
};
var interval_id = setInterval(replaceThing, 1000);

 