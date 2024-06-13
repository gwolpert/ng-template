// List of required plugins
const plugins = [
	require('karma-jasmine'),
	require('karma-chrome-launcher'),
	require('karma-jasmine-html-reporter'),
	require('karma-junit-reporter'),
	require('karma-coverage'),
	require('@angular-devkit/build-angular/plugins/karma')
];

// Output directory for test results
const outputDir = 'dist/test-results';

module.exports = (config) => {
	const { watch, codeCoverage } = config.buildWebpack.options;

	// Base configuration options
	const options = {
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins,
		browsers: [watch ? 'Chrome' : 'ChromeHeadless'], // Use Chrome for watch mode, else use headless
		singleRun: !watch, // Run once by default, keep watching if in watch mode
		reporters: ['progress', 'kjhtml', 'junit'],
		jasmineHtmlReporter: { suppressAll: true },
		client: { clearContext: false },
		autoWatch: !!watch, // Enable autoWatch only in watch mode
		restartOnFileChange: !!watch // Restart on file change only in watch mode
	};

	// Add coverage reporter if codeCoverage is enabled
	if (codeCoverage) {
		options.coverageReporter = {
			dir: require('path').join(__dirname, `./${outputDir}`),
			reporters: [
				{ subdir: '.', type: 'cobertura', file: 'coverage.xml' },
				{ subdir: '.', type: 'lcov', file: 'lcov.info' }
			]
		};
		options.junitReporter = {
			outputDir,
			useBrowserName: true
		};
	}

	// Set the configuration
	config.set(options);
};
