node based on libuv




---------------beforeExit 
//对于导致显式终止的条件，不会触发 'beforeExit' 事件，例如调用 process.exit() 或未捕获的异常。

-----------------exit
当 Node.js 进程因以下原因之一即将退出时，则会触发 'exit' 事件：

    显式调用 process.exit() 方法；
    Node.js 事件循环不再需要执行任何其他工作。

    process.on('exit', (code) => {
	  setTimeout(() => {
	    console.log('此处不会运行');
	  }, 0);
	});//Node.js 进程将立即退出，从而导致在事件循环中仍排队的任何其他工作被放弃

-----------------uncaughtException
当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件
	process.on('uncaughtException', (err) => {
	  fs.writeSync(1, `捕获的异常：${err}\n`);
	});
想让一个已经崩溃的应用正常运行，更可靠的方式应该是启动另外一个进程来监测/探测应用是否出错， 无论 uncaughtException 事件是否被触发，如果监测到应用出错，则恢复或重启应用。

-------------------process.abort()
process.abort()方法会使Node.js进程立即结束，并生成一个core文件。

-------------------process.argv
第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，参阅 process.argv0。 第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。

-------------------process.chdir(directory)
process.chdir()方法变更Node.js进程的当前工作目录，如果变更目录失败会抛出异常(例如，如果指定的目录不存在)。
try {
  process.chdir('/tmp');
  console.log(`New directory: ${process.cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}

-------------------process.config
返回一个Javascript对象。此对象描述了用于编译当前Node.js执行程序时涉及的配置项信息。 这与执行./configure脚本生成的config.gypi文件结果是一样的。

-------------------process.cwd()
方法返回 Node.js 进程的当前工作目录。

-------------------process.env
process.env 属性返回包含用户环境的对象

-------------------process.execArgv
process.execArgv 属性返回当Node.js进程被启动时，Node.js特定的命令行选项。 这些选项在process.argv属性返回的数组中不会出现，并且这些选项中不会包括Node.js的可执行脚本名称或者任何在脚本名称后面出现的选项。 这些选项在创建子进程时是有用的，因为他们包含了与父进程一样的执行环境信息。
例如:

$ node --harmony script.js --version

process.execArgv的结果:

	['--harmony']

process.argv的结果:

	['/usr/local/bin/node', 'script.js', '--version']

------------------process.exit([code])
process.exit() 方法以退出状态 code 指示 Node.js 同步地终止进程。

------------------process.nextTick(callback[, ...args])
process.nextTick() 方法将 callback 添加到下一个时间点的队列。 一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。
这不是 setTimeout(fn, 0) 的简单别名。 它的效率更高。 它会在事件循环的下一个时间点中触发任何其他 I/O 事件（包括定时器）之前运行。
这在开发 API 时非常重要，以便在构造对象之后但在发生任何 I/O 之前，为用户提供分配事件处理函数的机会

-----------------process.uptime()
返回当前 Node.js 进程运行时间秒长