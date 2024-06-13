export interface Environment {
	isDevelopment: boolean;
}

export const environment: Environment = {
	isDevelopment: '#{env-enableDeveloperPage}#'.toLowerCase() === 'true',
};
