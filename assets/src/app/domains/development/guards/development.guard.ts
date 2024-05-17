import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DEVELOPMENT_MODE } from '@app/core/injection-tokens/development-mode';

export const developmentGuard: CanActivateFn = (_route, _state) =>
	inject(DEVELOPMENT_MODE);
