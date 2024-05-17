import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { DEVELOPMENT_MODE } from '@app/core/injection-tokens/development-mode';

import { developmentGuard } from './development.guard';

describe('developmentGuard', () => {
	let developmentMode: boolean;
	const executeGuard: CanActivateFn = (...guardParameters) =>
		TestBed.runInInjectionContext(() => developmentGuard(...guardParameters));

	beforeEach(() => {
		developmentMode = false;
		TestBed.configureTestingModule({
			providers: [
				{ provide: DEVELOPMENT_MODE, useFactory: () => developmentMode },
			],
		});
	});

	it('should be created', () => {
		expect(executeGuard).toBeTruthy();
	});

	it('should return false if development mode is disabled', () => {
		expect(executeGuard({} as any, {} as any)).toBeFalse();
	});

	it('should return true if development mode is enabled', () => {
		developmentMode = true;
		expect(executeGuard({} as any, {} as any)).toBeTrue();
	});
});
