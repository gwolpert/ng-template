import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: '__appPrefix__-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './root.component.html',
})
export class RootComponent {}
