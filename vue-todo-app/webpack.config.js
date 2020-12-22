const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('@babel/polyfill');


module.exports ={
	//진입점
	entry: {
		app: [
			'@babel/polyfill',
			path.join(__dirname, 'main.js')
		]
	},
	// 결과물에 대한 설정
	output: {
		filename: '[name].js',  //app.js
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			// ... other rules
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			minify: false
		}),
		new CopyPlugin([
			{ from: "assets/", to: "" }
		]),
		new CleanWebpackPlugin()
	],
	devServer:{
		open: false,
		hot: true
	},
	devtool: "eval"
};