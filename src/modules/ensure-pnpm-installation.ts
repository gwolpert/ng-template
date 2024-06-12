import { createSpinner } from 'nanospinner';
import { execScript } from '../utils/exec-script';

export const ensurePnpmInstallation = async () => {
	const spinner = createSpinner('Ensuring PNPM is installed...').start();
	try {
		// Check if PNPM is already installed
		await execScript('pnpm --version');
		spinner.success({ text: 'PNPM has already been installed' });
	} catch {
		// If PNPM is not installed, attempt to install it
		console.warn('PNPM is not installed. Attempting installation...');
		spinner.update({ text: 'Installing PNPM...' });
		try {
			spinner.update({ text: 'Installing PNPM...' });
			await execScript('npm install --location=global pnpm');
			await execScript('pnpm setup');
		} catch (error) {
			// Something went wrong during installation
			spinner.error({ text: 'Failed to install PNPM' });
			console.error(error);
			process.exit(1);
		}
	}

	try {
		spinner.update({ text: 'Installing dependencies...' });
		await execScript('pnpm install');
	} catch (error) {
		// Something went wrong during installing dependencies
		spinner.error({ text: 'Failed to install dependencies' });
		console.error(error);
		process.exit(1);
	}

	// PNPM has been installed
	spinner.success({ text: 'Dependencies have been installed' });
};
