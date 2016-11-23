module.exports = {
	entry: {
		"indexTest": './main.js',
		"profileTest": './user.js',
		"admin": './admin.js'
	},
	output: {
		path: './',
		filename: '[name].js'
	},
	devServer: {
		inline: true,
		port: 3333
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}
