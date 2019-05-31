单个入口
entry: string|Array<string>（如果是一个数组，会将数组里面的文件一起打包到bundle.js）
为以下简写
	 entry: {
	    main: './path/to/my/entry/file.js'
	  }
(其中main为entry的键值)

output里filename有三个值：

.[name]是文件名字是entry的键值。

.[hash]是md5加密的值。

.[chunkhash]这里是作为版本号使用。
<!-- output: {
    path: __dirname + "/public",
    filename: "[name][chunkhash].js"
  } -->
 （多入口用[name].js会输出多文件）

 path.resolve()
 	var path = require("path")     //引入node的path模块
	path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
	path.resolve('/foo/bar', 'baz')   // returns '/foo/bar/baz'
	path.resolve('/foo/bar', '/baz')   // returns '/baz'
	path.resolve('/foo/bar', '../baz')   // returns '/foo/baz'
	path.resolve('home','/foo/bar', '../baz')   // returns '/foo/baz'
	path.resolve('home','./foo/bar', '../baz')   // returns '/home/foo/baz'
	path.resolve('home','foo/bar', '../baz')   // returns '/home/foo/baz'
总结：从后向前，若字符以 / 开头，不会拼接到前面的路径；若以 ../ 开头，拼接前面的路径，且不含最后一节路径；若以 ./ 开头 或者没有符号 则拼接前面路径；（类似cd操作）