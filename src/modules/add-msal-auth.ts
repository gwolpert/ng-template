import { composeModuleFactory } from '../utils/compose-module-factory';

export const addMsalAuth = composeModuleFactory(
	'MSAL Authentication',
	async ({ appDir, assetsDir }) => {}
);
