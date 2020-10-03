module.exports = function() {
	return {
		files: [
			{pattern: 'src/**/events/**/*.ts'},
			{pattern: 'resources/**/*', instrument: false},
			{pattern: 'src/**/*.spec.ts', ignore: true},
			{pattern: 'tsconfig.*', instrument: false},
			{pattern: 'package.json', instrument: false},
			{pattern: 'jest.json', instrument: false},
			{pattern: 'dockerless.yml', instrument: false}
		],
		tests: [{pattern: 'src/**/*.spec.ts'}],
		env: {
			type: 'node',
			runner: 'node'
		},
		testFramework: 'jest',
		debug: true,

		setup: function(wallaby) {
			const jestConfig = require('./jest.json')
			Object.keys(jestConfig.moduleNameMapper).forEach(
				k =>
					(jestConfig.moduleNameMapper[k] = jestConfig.moduleNameMapper[k].replace(
						'<rootDir>',
						wallaby.localProjectDir + 'src/'
					))
			)
			wallaby.testFramework.configure(jestConfig)
		}
	}
}
