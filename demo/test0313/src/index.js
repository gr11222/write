console.log(223)
let a = 10;
var s = new Promise(
  (res, rej) => {
    setTimeout(() => { console.log(1); res(1) }, 1000)
  }).then(
    (num) =>
      new Promise(
        (res, rej) => {
          setTimeout(() => { console.log(num + 1); res(num + 1) }, 1000)
        })
  ).then(
    (num) => {
      setTimeout(() => {
        console.log(num + 1);
        return
      }, 2000);
    })