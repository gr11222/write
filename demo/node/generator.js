function request() {  // 此处的request返回的是一个Promise
    return new Promise((resolve, reject) => {
        // ajax({
        //     url: 'www.someurl.com',
        //     onSuccess(res) {
        //         resolve(res);
        //     },
        //     onFail(err) {
        //         reject(err);
        //     }
        //  });
        setTimeout(()=>{resolve("hello")},1000)
    });
}

let it = gen();
let p = it.next().value;  // p是yield返回的Promise
p.then(res => it.next(res),
    err => it.throw(err)  // 发生错误时，将错误抛入生成器
);

function* gen() {
    try {
        let response = yield request();
        console.log(response);
    } catch (error) {
        console.log('Ooops, ', error.message);  // 可以捕获Promise抛进来的错误！
    }
}