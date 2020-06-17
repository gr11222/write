function sup(name) {
  this.name = name;
}
sup.prototype.getName = function () {
  return this.name;
}

function sub(name) {
  sup.call(this, name)
}
(() => {
  let con = function () {

  }
  con.prototype = sup.prototype;
  con.prototype.constructor = sub;
  sub.prototype = new con()
})()

var a = new sub("g");
var b = new sub("gg");
console.dir(b)
console.dir(a)
console.dir(a instanceof sub)
console.dir(a instanceof sup)