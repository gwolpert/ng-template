import { Environment } from './environment.interface';

export const environment: Environment = {
	isDevelopment: '#{env-enableDeveloperPage}#'.toLowerCase() === 'true',
};
