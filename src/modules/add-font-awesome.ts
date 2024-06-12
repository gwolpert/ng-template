import { composeModuleFactory } from '../utils/compose-module-factory';
import { execScript } from '../utils/exec-script';

export const addFontAwesome = composeModuleFactory(
	'Font Awesome',
	async ({ appDir }) => {
		await execScript('echo "Not yet implemented"', appDir);
	}
);
