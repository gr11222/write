// 引入 Koa 
const Koa = require("koa");
// 创建服务 
const app = new Koa();
app.use(async (ctx, next) => {
	console.log(ctx)
	ctx.body = 'Hello World';
	console.log(1);
	await next();
	console.log(2);
});
app.use(async (ctx, next) => {
	console.log(3);
	await next();
	console.log(4);
});
app.use(async (ctx, next) => {
	console.log(5);
	await next();
	console.log(6);
}); 
// 监听服务 
app.listen(3000);