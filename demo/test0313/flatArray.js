function flat(arr) {
  var ret = [];
  let fn = (arr) => {
    arr.forEach(item => {
      Array.isArray(item) ? fn(item) : ret = [...ret, item];
    })
  }
  fn(arr)
  return ret;
}
var arr = flat([1, [2, [3]], 4])
console.log(arr)

let fn = arr => arr.reduce((arr, cur) => Array.isArray(cur) ? [...arr, ...fn(cur)] : [...arr, cur], []);
console.log(fn([1, [2, [3]], 4]))