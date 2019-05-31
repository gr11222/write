npx
npm v5.2.0 引入的一条命令（npx），npx 会帮你执行依赖包里的二进制文件。引入这个命令的目的是为了提升开发者使用包内提供的命令行工具的体验。

解决什么问题
使用本地已安装的可执行工具，而不需要配置 scripts

在过去的几年中，npm 生态越来越倾向于将 devDependencies 安装包作为项目本地依赖安装，而不是让用户在全局安装。这意味着像 mocha、gulp、bower、webpack 甚至 Vue 这种我们过去主要是全局安装的命令行工具，现在可以基于项目维度来管理他们的版本。【现在的工具包一般都安装在局部，而不是全局。】

那么，现在有了 npx 以后，操作就变得简单了：
我们在一个空的文件夹中，安装了本地 vue-cli，然后不需要写 scripts，直接使用 npx。

-----------------   npx vue init webpack yourproject(基于局部安装)

-----------------   npx create-react-app my-cool-new-app(安装一个临时create-react-app并调用它，而不用污染全局安装或需要多个步骤)

前提：npm 5.2.0 以上的版本就会有 npx 了。
例子：

npm i webpack -D
./node_modules/.bin/webpack -v

    1 npm i webpack -D
    2 ./node_modules/.bin/webpack -v

有了 npx，你只需要这样

npm i webpack -D
npx webpack -v

    1 npm i webpack -D
    2 npx webpack -v

也就是说 npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！

npx 甚至支持运行远程仓库的可执行文件，如

npx github:piuccio/cowsay hello

    1 npx github:piuccio/cowsay hello

再比如 npx http-server 可以一句话帮你开启一个静态服务器！

npx http-server
