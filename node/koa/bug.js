const http = require('http')
const qs = require("querystring")
const fs = require('fs')
const cheerio = require('cheerio')

function createReq(data, options) {
  return new Promise(resolve => {
    let content = qs.stringify(data)
    let str = "";
    Object.assign(options.headers, {
      'Content-Length': Buffer.byteLength(content)
    })
    let req = http.request(options, (res) => {
      res.setEncoding('utf8')
      res.on("data", (chunk) => {
        str += chunk;
      })
      res.on("end", () => {
        console.log(str)
        resolve(str)
      })
    })
    req.write(content)
    
    req.on('error', (e) => {
      console.log("error" + e.message)
    })
  })
}

async function run() {
  let options = {
    port: 80,
    path: '/',
    method: 'GET',
    timeout: 30000,
    headers: {
    }
  }
  let body = await createReq({}, options)
  fs.appendFile("./name.html", () => { })
  const $ = cheerio.load(body)
}
run()