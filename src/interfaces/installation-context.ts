import { PromptedInformation } from './prompted-information';

export interface InstallationContext {
	appDir: string;
	assetsDir: string;
	promptedInformation: PromptedInformation;
}
