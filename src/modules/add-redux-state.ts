import { composeModuleFactory } from '../utils/compose-module-factory';
import { execScript } from '../utils/exec-script';

export const addReduxState = composeModuleFactory(
	'Redux State Management',
	async ({ appDir }) => {
		await execScript('echo "Not yet implemented"', appDir);
	}
);
