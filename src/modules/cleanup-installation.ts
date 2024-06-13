import { removeDir } from '../utils/file-system';
import { createSpinner } from 'nanospinner';

export async function cleanupInstallation(assetsDir: string): Promise<void> {
	const spinner = createSpinner('Cleaning up installation...').start();
	try {
		spinner.update({ text: 'Removing asset folder...' });
		await removeDir(assetsDir);
	} catch (error) {
		spinner.error({ text: 'Failed to clean up installation' });
		console.error(error);
		process.exit(1);
	}

	spinner.success({ text: 'Installation has been cleaned up' });
}
