import { addSchematic } from '../utils/add-schematic';
import { createSpinner } from 'nanospinner';

export const addAngularLocalize = async (path: string) => {
	const spinner = createSpinner('Configuring Angular Localize...').start();
	try {
		await addSchematic('@angular/localize', path);
	} catch (error) {
		spinner.error({ text: 'Failed to configure Angular Localize' });
		console.error(error);
		process.exit(1);
	}

	// Angular Localize has been configured successfully
	spinner.success({ text: 'Angular Localize has been configured' });
};
