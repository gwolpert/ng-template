import { BasicInformation } from '../interfaces/basic-information';
import { createSpinner } from 'nanospinner';
import { execScript } from '../utils/exec-script';
import {
	cloneDir,
	cloneFile,
	readFileContent,
	removeDir,
	replaceFileContent,
	writeFileContent,
} from '../utils/file-system';

/**
 * Generate an Angular app using the Angular CLI
 * @param basicInformation The basic information for the Angular app
 * @returns The path to the generated Angular app
 */
export const generateAngularApp = async (
	basicInformation: BasicInformation
): Promise<string> => {
	const { name, prefix, destinationFolder } = basicInformation;
	const appFolder = `${destinationFolder}/${name}`;
	const spinner = createSpinner(
		'Generating Angular app using the Angular CLI...'
	).start();
	try {
		// Create the Angular app using the Angular CLI
		await execScript(
			`ng new ${name} --prefix=${prefix} --style=scss --package-manager=pnpm --routing --skip-git --skip-install`,
			destinationFolder
		);

		// Install additional dependencies
		const devDependencies = ['@types/luxon', 'karma-junit-reporter'].join(' ');
		await execScript(`pnpm install --save-dev ${devDependencies}`, appFolder);

		const dependencies = [
			'@microsoft/applicationinsights-web',
			'luxon',
			'ngxtension',
		].join(' ');
		await execScript(`pnpm install --save ${dependencies}`, appFolder);

		// Update Angular app configuration
		await updateAngularJson(name, `${appFolder}/angular.json`);
		await updatePackageJson(name, `${appFolder}/package.json`);
		await updateTsConfigJson(`${appFolder}/tsconfig.json`);

		// Copy additional files
		const assetsDir = `${__dirname}/../assets`;
		await removeDir(`${appFolder}/src`);
		await cloneDir(`${assetsDir}/src`, `${appFolder}/src`);
		await cloneFile(`${assetsDir}/karma.conf.js`, `${appFolder}/karma.conf.js`);
		await cloneFile(
			`${assetsDir}/karma-dev.conf.js`,
			`${appFolder}/karma-dev.conf.js`
		);
		await replaceFileContent({
			files: [`${appFolder}/**/*.{html,ts}`],
			from: /__appPrefix__/g,
			to: prefix,
		});
		await replaceFileContent({
			files: [`${appFolder}/**/*.{html,ts}`],
			from: /__appName__/g,
			to: name,
		});
	} catch (error) {
		spinner.error({
			text: 'Failed to generate Angular app using the Angular CLI',
		});
		console.error(error);
		process.exit(1);
	}

	// Angular app has been generated successfully
	spinner.success({
		text: 'Angular app has been generated using the Angular CLI',
	});

	// return the path to the generated Angular app
	return appFolder;
};

const updateAngularJson = async (name: string, path: string) => {
	const angularJson = JSON.parse(await readFileContent(path));

	angularJson['cli']['analytics'] = false;
	const project = angularJson['projects'][name]['architect'];
	project['build']['options']['assets'] = ['src/favicon.ico', 'src/assets/img'];
	project['build']['options']['stylePreprocessorOptions'] = {
		includePaths: ['src/assets/scss/'],
	};
	project['build']['configurations']['development']['fileReplacements'] = [
		{
			replace: 'src/environments/environment.ts',
			with: 'src/environments/environment.development.ts',
		},
	];
	project['serve']['options'] = {
		host: 'localhost',
		port: 3000,
		headers: {
			'X-Content-Type-Options': 'nosniff',
			'X-Frame-Options': 'Deny',
			'Referrer-Policy': 'same-origin',
			'Strict-Transport-Security': 'max-age=31536000; includeSubdomains',
			'Content-Security-Policy':
				"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://*.applicationinsights.azure.com",
			'Permissions-Policy':
				'accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=()',
		},
	};
	project['test']['options']['codeCoverage'] = true;
	project['test']['configurations'] = {
		development: {
			karmaConfig: 'karma-dev.conf.js',
			codeCoverage: false,
		},
	};

	await writeFileContent(path, JSON.stringify(angularJson, null, 2));
};

const updatePackageJson = async (name: string, path: string) => {
	const packageJson = JSON.parse(await readFileContent(path));
	packageJson.version = '0.0.1';
	packageJson.scripts = {
		'ng': 'node --max-old-space-size=8192 node_modules/@angular/cli/bin/ng',
		'build': 'pnpm ng build --localize',
		'start': 'pnpm ng serve',
		'test': 'pnpm ng test',
		'test:dev': 'pnpm ng test --configuration development',
		// 'start:nl': 'pnpm ng serve --configuration nl',
		// 'lint': 'pnpm ng lint',
		// 'i18n': 'pnpm ng extract-i18n',
		// 'precommit': 'pnpm lint',
	};
	await writeFileContent(path, JSON.stringify(packageJson, null, 2));
};

const updateTsConfigJson = async (path: string) => {
	const tsConfigContent = await readFileContent(path);
	const jsCommentsRegex = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*/gm;
	const tsConfigJson = JSON.parse(tsConfigContent.replace(jsCommentsRegex, ''));
	const compilerOptions = tsConfigJson['compilerOptions'];
	compilerOptions['paths'] = {
		['@app/core/*']: ['src/app/core', 'src/app/core/*'],
		['@app/shared/*']: ['src/app/domains/shared', 'src/app/domains/shared/*'],
		['@app/domains/*']: ['src/app/domains', 'src/app/domains/*'],
		['@app/pages/*']: ['src/app/pages', 'src/app/pages/*'],
		['@app/utils/*']: ['src/app/utils', 'src/app/utils/*'],
		['@app/environments/*']: ['src/environments', 'src/environments/*'],
	};
	compilerOptions['strictPropertyInitialization'] = false;
	compilerOptions['baseUrl'] = './';
	tsConfigJson['include'] = ['src', 'src/**/*.ts'];
	tsConfigJson['exclude'] = ['**/node_modules', '**/.*/'];
	await writeFileContent(path, JSON.stringify(tsConfigJson, null, 2));
};
