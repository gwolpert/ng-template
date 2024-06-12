import { composeModuleFactory } from '../utils/compose-module-factory';
import { execScript } from '../utils/exec-script';

export const addAngularMaterial = composeModuleFactory(
	'Angular Material',
	async ({ appDir }) => {
		await execScript('echo "Not yet implemented"', appDir);
	}
);
