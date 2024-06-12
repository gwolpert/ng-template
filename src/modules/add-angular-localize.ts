import { addSchematic } from '../utils/add-schematic';
import { readFileContent, writeFileContent } from '../utils/file-system';
import { execScript } from '../utils/exec-script';
import { composeModuleFactory } from '../utils/compose-module-factory';

export const addAngularLocalize = composeModuleFactory(
	'Angular Localize',
	async ({ appDir }) => {
		await addSchematic('@angular/localize', appDir);

		// Update Angular configuration
		const angularJsonPath = `${appDir}/angular.json`;
		const angularJson = JSON.parse(await readFileContent(angularJsonPath));
		const firstProject = Object.keys(angularJson.projects).at(0);
		if (firstProject) {
			const project = angularJson['projects'][firstProject];
			project['i18n'] = {
				sourceLocale: 'en',
				locales: {},
			};
			project['architect']['build']['configurations']['en'] = {
				localize: ['en'],
				i18nMissingTranslation: 'error',
			};
			project['architect']['build']['defaultConfiguration'] = 'production,en';
			project['architect']['extract-i18n']['options'] = {
				buildTarget: `${firstProject}:build`,
				outputPath: 'src/locales',
				outFile: 'translations.xlf',
			};
			project['architect']['build']['options']['localize'] = ['en'];
			await writeFileContent(
				angularJsonPath,
				JSON.stringify(angularJson, null, 2)
			);
		}

		// Update package.json scripts
		const packageJsonPath = `${appDir}/package.json`;
		const packageJson = JSON.parse(await readFileContent(packageJsonPath));
		packageJson.scripts['i18n'] = 'pnpm ng extract-i18n';
		await writeFileContent(
			packageJsonPath,
			JSON.stringify(packageJson, null, 2)
		);

		// Extract translations
		await execScript('pnpm i18n', appDir);
	}
);
