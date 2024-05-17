import { createSpinner } from 'nanospinner';
import { addSchematic } from '../utils/add-schematic';
import { execScript } from '../utils/exec-script';

export const addEslint = async (path: string) => {
	const spinner = createSpinner('Adding ESLint...').start();
	try {
		await addSchematic('@angular-eslint/schematics', path);

		const devDependencies = [
			'eslint',
			'eslint-config-prettier',
			'eslint-plugin-prettier',
			'eslint-plugin-simple-import-sort',
			'prettier',
		].join(' ');
		await execScript(`pnpm install --save-dev ${devDependencies}`, path);
	} catch (error) {
		spinner.error({ text: 'Failed to add ESLint' });
		console.error(error);
		process.exit(1);
	}

	// ESLint has been added successfully
	spinner.success({ text: 'ESLint has been added' });
};
