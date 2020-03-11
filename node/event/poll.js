const fs = require('fs')
const event = require('events')

class ee extends event { }
const yy = new ee()
yy.on('c', () => {
  console.log("emit c");
})
setImmediate(() => {
  console.log("immediate 1");
})
setTimeout(() => {
  console.log("timeout 1");
}, 0)
setTimeout(() => {
  console.log("timeout 2");
}, 13)

fs.readFile('./test.js', () => {
  console.log("read 1");
})
fs.readFile('./test.js', () => {
  console.log("read 2");
})

process.nextTick(() => {
  console.log("nextTick 1");
})
new Promise((res) => {
  console.log("promise 1");
  yy.emit("c");
  res()
}).then(() => {
  process.nextTick(() => {
    console.log("nextTick 2");
  }); console.log("then 1");
}
).then(() => {
  console.log("then 2");
})

process.nextTick(() => {
  console.log("nextTick 6565656");
});