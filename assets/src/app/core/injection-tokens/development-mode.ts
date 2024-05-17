import { InjectionToken, Provider } from '@angular/core';
import { environment } from '@app/environments/environment';

export const DEVELOPMENT_MODE = new InjectionToken<boolean>('DEVELOPMENT_MODE');

export function provideDevelopmentMode(): Provider {
	return {
		provide: DEVELOPMENT_MODE,
		useValue: environment.isDevelopment,
	};
}
