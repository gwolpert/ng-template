import { TestBed } from '@angular/core/testing';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RootComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(RootComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
