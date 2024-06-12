import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: '__appPrefix__-home-page',
	standalone: true,
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './home-page.component.html',
})
export class HomePageComponent {}

export default HomePageComponent;
