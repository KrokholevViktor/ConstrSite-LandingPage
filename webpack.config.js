const config = {
	mode: 'production',
	entry: {
		index: './src/js/script.js'
		// contacts: './src/js/contacts.js',
		// about: './src/js/about.js',
	},
	output: {
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;
