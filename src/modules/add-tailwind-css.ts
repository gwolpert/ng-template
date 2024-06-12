import { composeModuleFactory } from '../utils/compose-module-factory';
import { execScript } from '../utils/exec-script';

export const addTailwindCss = composeModuleFactory(
	'Tailwind CSS',
	async ({ appDir }) => {
		await execScript('echo "Not yet implemented"', appDir);
	}
);
