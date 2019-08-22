const http = require("http")
const qs = require("qs")
const fs = require("fs")

let reqPro = (data) => new Promise((resolve) => {
  let content = qs.stringify(data)
  let options = {
    hostname: "192.168.0.1",
    port: 80,
    path: '/cgi-bin/web.cgi',
    data: content,
    method: "POST",
    headers: {}
  }
  var req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      resolve(chunk)
    })
  })
  req.write(content)
  req.on("error", (e) => {
    console.log("problem with request: " + e.message)
  })
})

let run = async () => {
  let ret = await reqPro(data)
  let file = fs.createWriteStream("./http-body.json")
  file.write(ret)
  file.end()
}
run()