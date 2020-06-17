(function() {
  var a = b = 3;
})();
console.log(typeof a === 'undefined');//true
console.log(typeof b === 'undefined');//false
// var a = b = 3是怎样执行的,伪代码:
// b = 3;
// var a = b;
