import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: '__appPrefix__-root',
	standalone: true,
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './root.component.html',
})
export class RootComponent {}
