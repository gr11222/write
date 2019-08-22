// 引入 Koa 
const Koa = require("koa");
const logger = require("koa-logger");
const session = require("koa-session");
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
app.listen(3000);