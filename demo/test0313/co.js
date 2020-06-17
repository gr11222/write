var obj = {}
obj.a = 0;
var num = 0
Object.defineProperty(obj, 'a', {
  get() {
    return ++num;
  },
  set(value) {
    console.log('get!');
  }
})
console.log(obj.a)
console.log(obj.a)
console.log(obj.a)
