import { createSpinner } from 'nanospinner';
import { execScript } from '../utils/exec-script';

export const ensureAngularCliInstallation = async (): Promise<void> => {
	const spinner = createSpinner('Ensuring Angular CLI is installed...').start();
	try {
		// Check if Angular CLI is already installed
		await execScript('ng version');
		spinner.success({ text: 'Angular CLI has already been installed' });
	} catch {
		// If Angular CLI is not installed, attempt to install it
		console.warn('Angular CLI is not installed. Attempting installation...');
		spinner.update({ text: 'Installing Angular CLI...' });
		try {
			await execScript('npm install --global @angular/cli');
		} catch (error) {
			// Something went wrong during installation
			spinner.error({ text: 'Failed to install Angular CLI' });
			console.error(error);
		}

		// Angular CLI has been installed
		spinner.success({ text: 'Angular CLI has been installed' });
	}
};
