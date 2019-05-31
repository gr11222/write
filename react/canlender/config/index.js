var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
module.exports = {
	// mode:'production',
	devtool: 'eval-source-map',
	entry: {
		main: path.resolve(__dirname, '../src/index.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'index.js'
	},
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						"env", "react"
					]
				}
			},
			//配置css-loader
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			//配置less-loader
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		host: "localhost",
		port: "8090",
		hot: true // 开启热更新
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
        //以该文件下的本地index.html作为模板,打包的时候自动生成服务器html并自动引入打包的js文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname , "../index.html")
        })
    ],
    performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    
    }
}
}