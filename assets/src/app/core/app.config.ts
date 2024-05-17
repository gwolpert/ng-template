import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDevelopmentMode } from './injection-tokens/development-mode';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideDevelopmentMode(),
	],
};
