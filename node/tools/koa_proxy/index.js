const Koa = require("koa")
const k2c = require("koa2-connect")
const logger = require("koa-logger")
const serve = require("koa-static")
const proxy = require("http-proxy-middleware")
const fs = require("fs")
const colors = require("colors")

const app = new Koa()
app.use(logger())
app.use(async (ctx, next) => {
  if (ctx.url.indexOf("/string") != -1) {
    await k2c(proxy({
      target: "http://127.0.0.1",
      changeOrigin: true
    }))(ctx, next)
  }
  await next()
})

app.use(serve('www/'))

app.listen(80, () => {
  console.log("\r\n\r\n\t\t\tnode server start (:\r\n\r\n".red)
})