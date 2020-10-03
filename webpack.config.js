const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
	entry: './src/index.ts',
	// Prevents warnings from TypeScript compiler
	externals: [
		nodeExternals({
			allowlist: ['webpack/hot/poll?100']
		})
	],
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx'],
		alias: {
			'@src': path.resolve(__dirname, 'src/'),
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@modules': path.resolve(__dirname, 'src/modules/')
		}
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, 'lib'),
		filename: '[name].js'
	},
	target: 'node',
	mode: 'development',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts(x?)$/,
				use: [
					{
						loader: 'ts-loader',
						options: {transpileOnly: true}
					}
				]
			},
			{
				test: /\.ya?ml$/,
				use: [
					{
						loader: path.resolve('yaml-loader.js')
					}
				]
			}
		]
	}
}
