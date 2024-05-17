import { createSpinner } from 'nanospinner';
import { execScript } from '../utils/exec-script';

export const ensureAngularCliInstallation = async (): Promise<void> => {
	const spinner = createSpinner('Ensuring Angular CLI is installed...').start();

	try {
		// Check if Angular CLI is already installed
		await execScript('pnpm ng version');
		const version = await execScript('pnpm info @angular/cli version');
		spinner.update({
			text: `Angular CLI (v${version}) has been installed`,
		});
	} catch (error) {
		spinner.error({ text: 'Failed to install Angular CLI' });
		console.error(error);
	}

	// Angular CLI has been installed
	spinner.success({ text: 'Angular CLI has been installed' });
};
