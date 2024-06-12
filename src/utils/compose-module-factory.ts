import { InstallationContext } from '../interfaces';
import { createSpinner } from 'nanospinner';

export function composeModuleFactory(
	moduleName: string,
	// eslint-disable-next-line no-unused-vars
	callback: (moduleInformation: InstallationContext) => Promise<void>
) {
	return async (moduleInformation: InstallationContext): Promise<void> => {
		const spinner = createSpinner(`Adding ${moduleName}...`).start();
		try {
			spinner.update({ text: `Installing ${moduleName}...` });
			await callback(moduleInformation);
		} catch (error) {
			spinner.error({ text: `Failed to install ${moduleName}` });
			console.error(error);
			process.exit(1);
		}

		spinner.success({ text: `${moduleName} added successfully` });
	};
}
