/**
 * Karma configuration file for CI environment
 * @param {*} config configuration object for karma
 */
module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-junit-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			jasmine: { },
			clearContext: false
		},
		jasmineHtmlReporter: {
			suppressAll: true
		},
		coverageReporter: {
			dir: require('path').join(__dirname, './testresults'),
			reporters: [{
				subdir: '.',
				type: 'cobertura',
				file: 'coverage.xml'
			},
			{
				subdir: '.',
				type: 'lcov',
				file: 'lcov.info'
			}]
		},
		reporters: ['progress', 'kjhtml', 'junit'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['ChromeHeadless'],
		singleRun: true,
		restartOnFileChange: false,
		junitReporter: {
			outputDir: 'testresults',
			outputFile: undefined,
			suite: '',
			useBrowserName: true,
			nameFormatter: undefined,
			classNameFormatter: undefined,
			properties: {},
			xmlVersion: null
		}
	});
};
