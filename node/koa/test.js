// 引入 Koa 
const Koa = require("koa");
const logger = require("koa-logger");
const session = require("koa-session");

const https = require("https");
const fs = require("fs");
const enforceHttps = require("koa-sslify");
// 创建服务 
function fn() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
			console.log("hello");
		}, 3000);
	});
}
const app = new Koa();
// console.dir(enforceHttps)
app.use(enforceHttps.default());
const options = {
	key: fs.readFileSync('./privatekey.pem'),
  	cert: fs.readFileSync('./certificate.pem')
}
app.keys = ['session']
app.use(logger())
app.use(session(app))
app.use(async (ctx, next) => {
	if (ctx.path === '/favicon.ico') return;
	let n = ctx.session.views || 0;
	ctx.session.views = ++n;
	ctx.body = n + "views";
	await next();
});

// app.use(async (ctx, next) => {
// 	console.log(3);
// 	await next();
// 	console.log(4);
// });
// app.use(async (ctx, next) => {
// 	console.log(5);
// 	await next();
// 	console.log(6);
// });
// 监听服务 
app.listen(80);
https.createServer(options,app.callback()).listen(443)