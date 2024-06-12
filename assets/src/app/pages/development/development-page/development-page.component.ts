import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: '__appPrefix__-development-page',
	standalone: true,
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './development-page.component.html',
})
export class DevelopmentPageComponent {}

export default DevelopmentPageComponent;
