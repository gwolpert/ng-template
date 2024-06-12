import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: '__appPrefix__-not-found',
	standalone: true,
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}

export default NotFoundComponent;
