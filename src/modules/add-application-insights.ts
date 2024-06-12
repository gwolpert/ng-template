import { composeModuleFactory } from '../utils/compose-module-factory';
import { execScript } from '../utils/exec-script';

export const addApplicationInsights = composeModuleFactory(
	'Application Insights',
	async ({ appDir }) => {
		await execScript('echo "Not yet implemented"', appDir);
	}
);
