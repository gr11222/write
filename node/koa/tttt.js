const app = {
  middlewares: []
};

// 创建 use 方法
app.use = function (fn) {
  app.middlewares.push(fn);
};


app.compose = function () {
  // 递归函数
  function dispatch(index) {
    // 如果所有中间件都执行完跳出
    if (index === app.middlewares.length) return;
    // 取出第 index 个中间件并执行
    const route = app.middlewares[index];
    route(() => dispatch(index + 1));
  }

  // 取出第一个中间件函数执行
  dispatch(0);
};


app.use(next => {
  console.log(1);
  next();
  console.log(2);
});

app.use(next => {
  console.log(3);
  next();
  console.log(4);
});

console.log(app.compose());