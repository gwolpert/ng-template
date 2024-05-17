import { createSpinner } from 'nanospinner';
import { execScript } from '../utils/exec-script';
import { cloneFile } from '../utils/file-system';

export const addEslint = async (appDir: string, assetsDir: string) => {
	const spinner = createSpinner('Adding ESLint...').start();
	try {
		const devDependencies = [
			'@angular-eslint/eslint-plugin',
			'@angular-eslint/eslint-plugin-template',
			'@eslint/js',
			'eslint',
			'eslint-config-prettier',
			'eslint-plugin-prettier',
			'eslint-plugin-simple-import-sort',
			'prettier',
			'typescript-eslint',
		].join(' ');
		await execScript(`pnpm install --save-dev ${devDependencies}`, appDir);
		await cloneFile(
			`${assetsDir}/eslint.config.mjs`,
			`${appDir}/eslint.config.mjs`
		);
	} catch (error) {
		spinner.error({ text: 'Failed to add ESLint' });
		console.error(error);
		process.exit(1);
	}

	// ESLint has been added successfully
	spinner.success({ text: 'ESLint has been added' });
};
