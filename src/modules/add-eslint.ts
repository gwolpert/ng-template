import { execScript } from '../utils/exec-script';
import {
	cloneFile,
	readFileContent,
	writeFileContent,
} from '../utils/file-system';
import { addSchematic } from '../utils/add-schematic';
import { composeModuleFactory } from '../utils/compose-module-factory';

export const addEslint = composeModuleFactory(
	'ESLint',
	async ({ appDir, assetsDir }) => {
		await addSchematic('@angular-eslint/schematics', appDir);
		const devDependencies = [
			'globals',
			'@eslint/js',
			'eslint-plugin-prettier',
			'eslint-config-prettier',
			'eslint-plugin-simple-import-sort',
		].join(' ');
		await execScript(`pnpm install --save-dev ${devDependencies}`, appDir);
		await cloneFile(
			`${assetsDir}/eslint.config.js`,
			`${appDir}/eslint.config.js`
		);

		// Update Angular configuration
		const angularJsonPath = `${appDir}/angular.json`;
		const angularJson = JSON.parse(await readFileContent(angularJsonPath));
		const firstProject = Object.keys(angularJson.projects).at(0);
		if (firstProject) {
			angularJson['projects'][firstProject]['architect']['lint']['options'] = {
				eslintConfig: 'eslint.config.js',
				lintFilePatterns: ['src/**/*.ts', 'src/**/*.html'],
				maxWarnings: 10,
				fix: true,
			};
			await writeFileContent(
				angularJsonPath,
				JSON.stringify(angularJson, null, 2)
			);
		}

		// Update package.json scripts
		const packageJsonPath = `${appDir}/package.json`;
		const packageJson = JSON.parse(await readFileContent(packageJsonPath));
		packageJson.scripts.lint = 'pnpm ng lint';
		await writeFileContent(
			packageJsonPath,
			JSON.stringify(packageJson, null, 2)
		);
		await execScript('pnpm lint', appDir);
	}
);
