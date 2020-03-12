browser:执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。
console.log('script start')

async function async1() {
await async2()
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
}
async1()

setTimeout(function() {
console.log('setTimeout')
}, 0)

new Promise(resolve => {
console.log('Promise')
resolve()
})
.then(function() {
console.log('promise1')
})
.then(function() {
console.log('promise2')
})

console.log('script end')
 // 旧版输出如下，但是请继续看完本文下面的注意那里，新版有改动
// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout
// 新版输出
// script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout

如果await 后面直接跟的为一个变量，比如：await 1；这种情况的话相当于直接把await后面的代码注册为一个微任务，可以简单理解为promise.then(await下面的代码)。然后跳出async1函数，执行其他代码，当遇到promise函数的时候，会注册promise.then()函数到微任务队列，注意此时微任务队列里面已经存在await后面的微任务。所以这种情况会先执行await后面的代码（async1 end），再执行async1函数后面注册的微任务代码(promise1,promise2)。

如果await后面跟的是一个异步函数的调用，比如上面的代码，将代码改成这样：
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(()=>{
        console.log('async2 end1')
    })
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})

console.log('script end')
// 输出
// script start => async2 end => Promise => script end => async2 end1 => promise1 => promise2 => async1 end => setTimeout

此时执行完awit并不先把await后面的代码注册到微任务队列中去，而是执行完await之后，直接跳出async1函数，执行其他代码。然后遇到promise的时候，把promise.then注册为微任务。其他代码执行完毕后，需要回到async1函数去执行剩下的代码，然后把await后面的代码注册到微任务队列当中，注意此时微任务队列中是有之前注册的微任务的。所以这种情况会先执行async1函数之外的微任务(promise1,promise2)，然后才执行async1内注册的微任务(async1 end).
可以理解为，这种情况下，await 后面的代码会在本轮循环的最后被执行.
浏览器中有事件循环，node 中也有，事件循环是 node 处理非阻塞 I/O 操作的机制，node中事件循环的实现是依靠的libuv引擎。由于 node 11 之后，事件循环的一些原理发生了变化，这里就以新的标准去讲，最后再列上变化点让大家了解前因后果。

 node 的事件循环的阶段顺序为：
 <!-- https://juejin.im/post/5e5c7f6c518825491b11ce93#heading-4 -->
 <!-- https://blog.csdn.net/i10630226/article/details/81369841 -->
输入数据阶段(incoming data)->轮询阶段(poll)->检查阶段(check)->关闭事件回调阶段(close callback)->定时器检测阶段(timers)->I/O事件回调阶段(I/O callbacks)->闲置阶段(idle, prepare)->轮询阶段...

setImmediate(() => {
    console.log('timeout1')
    Promise.resolve().then(() => console.log('promise resolve'))
    process.nextTick(() => console.log('next tick1'))
});
setImmediate(() => {
    console.log('timeout2')
    process.nextTick(() => console.log('next tick2'))
});
setImmediate(() => console.log('timeout3'));
setImmediate(() => console.log('timeout4'));

在 node11 之前，因为每一个 eventLoop 阶段完成后会去检查 nextTick 
队列，如果里面有任务，会让这部分任务优先于微任务执行，因此上述代码是先进入 check 阶段，执行所有 setImmediate，完成之后执行 nextTick 队列，最后执行微任务队列，因此输出为timeout1=>timeout2=>timeout3=>timeout4=>next tick1=>next tick2=>promise resolve

在 node11 之后，process.nextTick 是微任务的一种,因此上述代码是先进入 check 阶段，执行一个 setImmediate 宏任务，然后执行其微任务队列，再执行下一个宏任务及其微任务,因此输出为timeout1=>next tick1=>promise resolve=>timeout2=>next tick2=>timeout3=>timeout4

如果是 node11 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)就立刻执行对应的微任务队列。

两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而nodejs中的微任务是在不同阶段之间执行的。





node 的初始化

初始化 node 环境。
执行输入代码。
执行 process.nextTick 回调。
执行 microtasks。
进入 event-loop

1. 进入 timers 阶段

检查 timer 队列是否有到期的 timer 回调，如果有，将到期的 timer 回调按照 timerId 升序执行。
检查是否有 process.nextTick 任务，如果有，全部执行。
检查是否有microtask，如果有，全部执行。
退出该阶段。
2. 进入IO callbacks阶段。

检查是否有 pending 的 I/O 回调。如果有，执行回调。如果没有，退出该阶段。
检查是否有 process.nextTick 任务，如果有，全部执行。
检查是否有microtask，如果有，全部执行。
退出该阶段。
3. 进入 idle，prepare 阶段：

这两个阶段与我们编程关系不大，暂且按下不表。

4. 进入 poll 阶段

首先检查是否存在尚未完成的回调，如果存在，那么分两种情况。
第一种情况：

如果有可用回调（可用回调包含到期的定时器还有一些IO事件等），执行所有可用回调。
检查是否有 process.nextTick 回调，如果有，全部执行。
检查是否有 microtaks，如果有，全部执行。
退出该阶段。
第二种情况：

如果没有可用回调。
检查是否有 immediate 回调，如果有，退出 poll 阶段。如果没有，阻塞在此阶段，等待新的事件通知。

如果不存在尚未完成的回调，退出poll阶段。

5. 进入 check 阶段

如果有immediate回调，则执行所有immediate回调。
检查是否有 process.nextTick 回调，如果有，全部执行。
检查是否有 microtaks，如果有，全部执行。
退出 check 阶段
6. 进入 closing 阶段。

如果有immediate回调，则执行所有immediate回调。
检查是否有 process.nextTick 回调，如果有，全部执行。
检查是否有 microtaks，如果有，全部执行。
退出 closing 阶段
检查是否有活跃的 handles（定时器、IO等事件句柄）

如果有，继续下一轮循环。
如果没有，结束事件循环，退出程序。
