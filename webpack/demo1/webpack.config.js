const path = require('path');
module.exports = {
  devtool: 'eval-source-map',
  entry:  {
  	main:__dirname +"/app/2.js",
  	de2:__dirname +"/app/3.js",
  },
  output: {
    path: path.resolve(__dirname,'public'),
    filename: "[name].js"
  },
  module:{
  	rules:[
  		{
  			test:/\.css$/, 
  			use: [
  				'style-loader',
          		'css-loader'
          	]
  		}
  	]
  }
}