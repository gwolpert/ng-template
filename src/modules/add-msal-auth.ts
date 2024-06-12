import { composeModuleFactory } from '../utils/compose-module-factory';
import { execScript } from '../utils/exec-script';

export const addMsalAuth = composeModuleFactory(
	'MSAL Authentication',
	async ({ appDir }) => {
		await execScript('echo "Not yet implemented"', appDir);
	}
);
