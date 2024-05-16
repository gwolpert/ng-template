import { BasicInformation } from '../interfaces/basic-information';
import { createSpinner } from 'nanospinner';
import { execScript } from '../utils/exec-script';
import { readFileContent, writeFileContent } from '../utils/file-system';

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
		await execScript(
			`ng new ${name} --prefix=${prefix} --style=scss --package-manager=pnpm --routing --skip-git --skip-install`,
			destinationFolder
		);

		const angularJsonPath = `${appFolder}/angular.json`;
		const angularJson = JSON.parse(await readFileContent(angularJsonPath));

		angularJson['cli']['analytics'] = false;
		const project = angularJson['projects'][name]['architect'];
		project['build']['options']['assets'] = [
			'src/favicon.ico',
			'src/assets/img',
		];
		project['build']['options']['stylePreprocessorOptions'] = {
			includePaths: ['src/assets/scss/'],
		};
		project['serve']['options'] = {
			host: 'localhost',
			port: 3000,
			headers: {},
		};
		project['test']['options']['codeCoverage'] = true;
		project['test']['configurations'] = {
			development: {
				karmaConfig: 'karma-dev.conf.js',
				codeCoverage: false,
			},
		};
		project['lint']['options']['fix'] = true;
		await writeFileContent(
			angularJsonPath,
			JSON.stringify(angularJson, null, 2)
		);
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
